import axios from "axios";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();


interface coinmetricsInter {
    data: Array<
        {
            assest: string;
            time: Date;
            ReferenceRate: string
        }
    >
    next_page_url: string;
}


type btcPrices = {
    coinmetricsPrice: number;
    timestamp: Date;
};

const main = async () => {
    console.time();
    const results: btcPrices[] = [];

    let date: string | number | Date = new Date().getTime();
    const stopDate = new Date("2022-01-01").getTime();
    let url = process.env.COINMETRICS_URL as string


    while (date >= stopDate) {
        console.log('start date:', date)
        console.log('stop date:', stopDate)
        try {
            const { data, headers } = await axios.get<coinmetricsInter>(url);

            console.log('headers:', headers['x-ratelimit-remaining'])

            if (Number(headers['x-ratelimit-remaining']) <= 100) {
                console.log('waiting for 2 minute')
                await new Promise(resolve => setTimeout(resolve, 120000));
            }

            data.data.map((item) => {
                results.push({
                    coinmetricsPrice: Number(item.ReferenceRate),
                    timestamp: item.time
                });
            })


            date = new Date(data.data[0].time).getTime()
            url = data.next_page_url

        } catch (err) {
            console.log(err);
        }
    }
    console.log(results)

    await prisma.coinmetrics.createMany({
        data: results.map((item) => {
            return {
                coinmetrics_price: Number(item.coinmetricsPrice),
                timestamp: item.timestamp
            };
        })
    });

    console.timeEnd();
};

main()
    .catch((e) => {
        throw e;
    }).finally(async () => {
        await prisma.$disconnect();
    });
