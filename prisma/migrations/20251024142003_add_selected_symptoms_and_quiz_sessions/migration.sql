-- CreateTable
CREATE TABLE "quiz_sessions" (
    "id" SERIAL NOT NULL,
    "session_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quiz_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "selected_symptoms" (
    "id" SERIAL NOT NULL,
    "session_id" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "selected_high_symptoms" JSONB NOT NULL,
    "selected_low_symptoms" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "selected_symptoms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quiz_sessions_session_id_key" ON "quiz_sessions"("session_id");

-- AddForeignKey
ALTER TABLE "selected_symptoms" ADD CONSTRAINT "selected_symptoms_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "quiz_sessions"("session_id") ON DELETE RESTRICT ON UPDATE CASCADE;
