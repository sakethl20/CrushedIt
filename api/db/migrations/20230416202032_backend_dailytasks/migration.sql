-- CreateTable
CREATE TABLE "DailyTaskList" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "listDate" TIMESTAMP(3) NOT NULL,
    "taskList" TEXT NOT NULL,

    CONSTRAINT "DailyTaskList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DailyTaskList" ADD CONSTRAINT "DailyTaskList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
