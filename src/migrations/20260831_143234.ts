import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "observe_moon_events_partners" RENAME COLUMN "website_url" TO "website";
  ALTER TABLE "observe_moon_events" DROP CONSTRAINT "observe_moon_events_listing_image_id_media_id_fk";
  
  ALTER TABLE "moon_registrations" ALTER COLUMN "equipment" SET DATA TYPE text;
  ALTER TABLE "moon_registrations" ALTER COLUMN "equipment" SET DEFAULT 'observer'::text;
  DROP TYPE "public"."enum_moon_registrations_equipment";
  CREATE TYPE "public"."enum_moon_registrations_equipment" AS ENUM('observer', 'bringing-equipment', 'astrophotography');
  ALTER TABLE "moon_registrations" ALTER COLUMN "equipment" SET DEFAULT 'observer'::"public"."enum_moon_registrations_equipment";
  ALTER TABLE "moon_registrations" ALTER COLUMN "equipment" SET DATA TYPE "public"."enum_moon_registrations_equipment" USING "equipment"::"public"."enum_moon_registrations_equipment";
  ALTER TABLE "moon_registrations" ALTER COLUMN "meal_preference" SET DATA TYPE text;
  ALTER TABLE "moon_registrations" ALTER COLUMN "meal_preference" SET DEFAULT 'no-meal'::text;
  DROP TYPE "public"."enum_moon_registrations_meal_preference";
  CREATE TYPE "public"."enum_moon_registrations_meal_preference" AS ENUM('no-meal', 'vegetarian', 'non-vegetarian', 'vegan');
  ALTER TABLE "moon_registrations" ALTER COLUMN "meal_preference" SET DEFAULT 'no-meal'::"public"."enum_moon_registrations_meal_preference";
  ALTER TABLE "moon_registrations" ALTER COLUMN "meal_preference" SET DATA TYPE "public"."enum_moon_registrations_meal_preference" USING "meal_preference"::"public"."enum_moon_registrations_meal_preference";
  ALTER TABLE "moon_registrations" ALTER COLUMN "status" SET DATA TYPE text;
  ALTER TABLE "moon_registrations" ALTER COLUMN "status" SET DEFAULT 'pending'::text;
  DROP TYPE "public"."enum_moon_registrations_status";
  CREATE TYPE "public"."enum_moon_registrations_status" AS ENUM('pending', 'confirmed', 'cancelled');
  ALTER TABLE "moon_registrations" ALTER COLUMN "status" SET DEFAULT 'pending'::"public"."enum_moon_registrations_status";
  ALTER TABLE "moon_registrations" ALTER COLUMN "status" SET DATA TYPE "public"."enum_moon_registrations_status" USING "status"::"public"."enum_moon_registrations_status";
  ALTER TABLE "observe_moon_events" ALTER COLUMN "status" SET DATA TYPE text;
  ALTER TABLE "observe_moon_events" ALTER COLUMN "status" SET DEFAULT 'draft'::text;
  DROP TYPE "public"."enum_observe_moon_events_status";
  CREATE TYPE "public"."enum_observe_moon_events_status" AS ENUM('draft', 'published');
  ALTER TABLE "observe_moon_events" ALTER COLUMN "status" SET DEFAULT 'draft'::"public"."enum_observe_moon_events_status";
  ALTER TABLE "observe_moon_events" ALTER COLUMN "status" SET DATA TYPE "public"."enum_observe_moon_events_status" USING "status"::"public"."enum_observe_moon_events_status";
  DROP INDEX "moon_registrations_year_idx";
  DROP INDEX "moon_registrations_event_slug_idx";
  DROP INDEX "observe_moon_events_listing_image_idx";
  ALTER TABLE "moon_registrations" ALTER COLUMN "registration_code" SET NOT NULL;
  ALTER TABLE "moon_registrations" ALTER COLUMN "event_slug" DROP NOT NULL;
  ALTER TABLE "moon_registrations" ALTER COLUMN "emergency_contact_name" SET NOT NULL;
  ALTER TABLE "moon_registrations" ALTER COLUMN "emergency_contact_phone" SET NOT NULL;
  ALTER TABLE "observe_moon_events_agenda" ALTER COLUMN "stage" DROP DEFAULT;
  ALTER TABLE "observe_moon_events" ALTER COLUMN "start_time" SET NOT NULL;
  ALTER TABLE "observe_moon_events" ALTER COLUMN "end_time" SET NOT NULL;
  ALTER TABLE "observe_moon_events_partners" ADD COLUMN "role" varchar;
  ALTER TABLE "observe_moon_events_partners" DROP COLUMN "partnership_type";
  ALTER TABLE "observe_moon_events" DROP COLUMN "listing_image_id";
  ALTER TABLE "observe_moon_events" DROP COLUMN "is_featured";
  DROP TYPE "public"."enum_observe_moon_events_partners_partnership_type";`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_observe_moon_events_partners_partnership_type" AS ENUM('Sponsor', 'Global Partner', 'Academic Partner', 'Media Partner', 'Equipment Partner');
  ALTER TABLE "moon_registrations" ALTER COLUMN "equipment" SET DATA TYPE text;
  ALTER TABLE "moon_registrations" ALTER COLUMN "equipment" SET DEFAULT 'observer'::text;
  DROP TYPE "public"."enum_moon_registrations_equipment";
  CREATE TYPE "public"."enum_moon_registrations_equipment" AS ENUM('bringing-equipment', 'observer', 'astrophotography');
  ALTER TABLE "moon_registrations" ALTER COLUMN "equipment" SET DEFAULT 'observer'::"public"."enum_moon_registrations_equipment";
  ALTER TABLE "moon_registrations" ALTER COLUMN "equipment" SET DATA TYPE "public"."enum_moon_registrations_equipment" USING "equipment"::"public"."enum_moon_registrations_equipment";
  ALTER TABLE "moon_registrations" ALTER COLUMN "meal_preference" SET DATA TYPE text;
  ALTER TABLE "moon_registrations" ALTER COLUMN "meal_preference" SET DEFAULT 'no-meal'::text;
  DROP TYPE "public"."enum_moon_registrations_meal_preference";
  CREATE TYPE "public"."enum_moon_registrations_meal_preference" AS ENUM('vegetarian', 'non-vegetarian', 'vegan', 'no-meal');
  ALTER TABLE "moon_registrations" ALTER COLUMN "meal_preference" SET DEFAULT 'no-meal'::"public"."enum_moon_registrations_meal_preference";
  ALTER TABLE "moon_registrations" ALTER COLUMN "meal_preference" SET DATA TYPE "public"."enum_moon_registrations_meal_preference" USING "meal_preference"::"public"."enum_moon_registrations_meal_preference";
  ALTER TABLE "moon_registrations" ALTER COLUMN "status" SET DATA TYPE text;
  ALTER TABLE "moon_registrations" ALTER COLUMN "status" SET DEFAULT 'pending'::text;
  DROP TYPE "public"."enum_moon_registrations_status";
  CREATE TYPE "public"."enum_moon_registrations_status" AS ENUM('confirmed', 'pending', 'cancelled');
  ALTER TABLE "moon_registrations" ALTER COLUMN "status" SET DEFAULT 'pending'::"public"."enum_moon_registrations_status";
  ALTER TABLE "moon_registrations" ALTER COLUMN "status" SET DATA TYPE "public"."enum_moon_registrations_status" USING "status"::"public"."enum_moon_registrations_status";
  ALTER TABLE "observe_moon_events" ALTER COLUMN "status" SET DATA TYPE text;
  ALTER TABLE "observe_moon_events" ALTER COLUMN "status" SET DEFAULT 'published'::text;
  DROP TYPE "public"."enum_observe_moon_events_status";
  CREATE TYPE "public"."enum_observe_moon_events_status" AS ENUM('published', 'draft', 'unpublished');
  ALTER TABLE "observe_moon_events" ALTER COLUMN "status" SET DEFAULT 'published'::"public"."enum_observe_moon_events_status";
  ALTER TABLE "observe_moon_events" ALTER COLUMN "status" SET DATA TYPE "public"."enum_observe_moon_events_status" USING "status"::"public"."enum_observe_moon_events_status";
  ALTER TABLE "moon_registrations" ALTER COLUMN "registration_code" DROP NOT NULL;
  ALTER TABLE "moon_registrations" ALTER COLUMN "event_slug" SET NOT NULL;
  ALTER TABLE "moon_registrations" ALTER COLUMN "emergency_contact_name" DROP NOT NULL;
  ALTER TABLE "moon_registrations" ALTER COLUMN "emergency_contact_phone" DROP NOT NULL;
  ALTER TABLE "observe_moon_events_agenda" ALTER COLUMN "stage" SET DEFAULT 'PHASE 01';
  ALTER TABLE "observe_moon_events" ALTER COLUMN "start_time" DROP NOT NULL;
  ALTER TABLE "observe_moon_events" ALTER COLUMN "end_time" DROP NOT NULL;
  ALTER TABLE "observe_moon_events_partners" ADD COLUMN "partnership_type" "enum_observe_moon_events_partners_partnership_type" DEFAULT 'Sponsor';
  ALTER TABLE "observe_moon_events_partners" ADD COLUMN "website_url" varchar;
  ALTER TABLE "observe_moon_events" ADD COLUMN "listing_image_id" integer;
  ALTER TABLE "observe_moon_events" ADD COLUMN "is_featured" boolean DEFAULT true;
  ALTER TABLE "observe_moon_events" ADD CONSTRAINT "observe_moon_events_listing_image_id_media_id_fk" FOREIGN KEY ("listing_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "moon_registrations_year_idx" ON "moon_registrations" USING btree ("year");
  CREATE INDEX "moon_registrations_event_slug_idx" ON "moon_registrations" USING btree ("event_slug");
  CREATE INDEX "observe_moon_events_listing_image_idx" ON "observe_moon_events" USING btree ("listing_image_id");
  ALTER TABLE "observe_moon_events_partners" DROP COLUMN "role";
  ALTER TABLE "observe_moon_events_partners" DROP COLUMN "website";`);
}
