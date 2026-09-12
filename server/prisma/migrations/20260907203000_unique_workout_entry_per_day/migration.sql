-- CreateIndex
CREATE UNIQUE INDEX "workout_entries_user_id_exercise_id_day_of_week_key" ON "workout_entries"("user_id", "exercise_id", "day_of_week");
