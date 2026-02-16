ALTER TABLE `certificates` MODIFY COLUMN `courseId` varchar(36);--> statement-breakpoint
ALTER TABLE `course_applications` MODIFY COLUMN `courseId` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `course_events` MODIFY COLUMN `courseId` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `course_files` MODIFY COLUMN `courseId` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `course_images` MODIFY COLUMN `courseId` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `course_materials` MODIFY COLUMN `courseId` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `courses` MODIFY COLUMN `id` varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE `certificates` ADD `auxiliar` varchar(255);--> statement-breakpoint
ALTER TABLE `certificates` ADD `ID_auxiliar` varchar(100);--> statement-breakpoint
ALTER TABLE `course_events` ADD `auxiliar` varchar(255);--> statement-breakpoint
ALTER TABLE `course_events` ADD `ID_auxiliar` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `matricula` varchar(50);