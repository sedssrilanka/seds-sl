import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_moon_registrations_meal_preference" AS ENUM('vegetarian', 'non-vegetarian', 'vegan', 'no-meal');
  ALTER TABLE "moon_registrations" ALTER COLUMN "status" SET DEFAULT 'pending';
  ALTER TABLE "moon_registrations" ADD COLUMN "emergency_contact_name" varchar;
  ALTER TABLE "moon_registrations" ADD COLUMN "emergency_contact_phone" varchar;
  ALTER TABLE "moon_registrations" ADD COLUMN "emergency_contact_relation" varchar;
  ALTER TABLE "moon_registrations" ADD COLUMN "meal_preference" "enum_moon_registrations_meal_preference" DEFAULT 'no-meal';
  ALTER TABLE "moon_registrations" ADD COLUMN "dietary_restrictions" varchar;`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "moon_registrations" ALTER COLUMN "status" SET DEFAULT 'confirmed';
  ALTER TABLE "moon_registrations" DROP COLUMN "emergency_contact_name";
  ALTER TABLE "moon_registrations" DROP COLUMN "emergency_contact_phone";
  ALTER TABLE "moon_registrations" DROP COLUMN "emergency_contact_relation";
  ALTER TABLE "moon_registrations" DROP COLUMN "meal_preference";
  ALTER TABLE "moon_registrations" DROP COLUMN "dietary_restrictions";
  DROP TYPE "public"."enum_moon_registrations_meal_preference";`);
}
