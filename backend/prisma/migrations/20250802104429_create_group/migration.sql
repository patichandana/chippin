-- CreateTable
CREATE TABLE "users" (
    "user_id" BIGSERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "firstname" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "groups" (
    "group_id" BIGSERIAL NOT NULL,
    "group_type" INTEGER NOT NULL,
    "group_name" VARCHAR(100) NOT NULL,
    "created_by" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("group_id")
);

-- CreateTable
CREATE TABLE "group_types" (
    "group_type_id" SERIAL NOT NULL,
    "group_type_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "group_types_pkey" PRIMARY KEY ("group_type_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "groups_group_name_key" ON "groups"("group_name");

-- CreateIndex
CREATE UNIQUE INDEX "group_types_group_type_name_key" ON "group_types"("group_type_name");

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_group_type_fkey" FOREIGN KEY ("group_type") REFERENCES "group_types"("group_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
