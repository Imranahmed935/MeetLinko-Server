import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
// import {PrismaClient} from "../../../src/generated/prisma/client"
import config from "../../config";
import { Pool } from "pg"
import { PrismaClient } from "../../generated/prisma/client";


const connectionString = config.database_url

const pool = new Pool({connectionString})
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({adapter})

export { prisma }


