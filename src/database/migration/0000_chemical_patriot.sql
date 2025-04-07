CREATE TABLE "event" (
	"digest" varchar NOT NULL,
	"seq" varchar NOT NULL,
	"payload" json NOT NULL,
	"type" varchar NOT NULL,
	"timestamp" varchar,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone,
	CONSTRAINT "event_digest_seq_unique" UNIQUE("digest","seq")
);
--> statement-breakpoint
CREATE TABLE "renew_token" (
	"user_id" bigint NOT NULL,
	"token" varchar NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone,
	CONSTRAINT "renew_token_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "setting" (
	"key" varchar NOT NULL,
	"value" varchar NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone,
	CONSTRAINT "setting_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"address" varchar NOT NULL,
	"balance" varchar NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) with time zone,
	CONSTRAINT "user_address_unique" UNIQUE("address")
);
