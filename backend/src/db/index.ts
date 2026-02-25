import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.ts";
import { ENV } from "../lib/env.ts";

const { DATABASE_URI } = ENV;
