ALTER TABLE `certificates` MODIFY COLUMN `courseId` varchar(36);--> statement-breakpoint
ALTER TABLE `certificates` ADD `auxiliar` varchar(255);--> statement-breakpoint
ALTER TABLE `certificates` ADD `ID_auxiliar` varchar(100);--> statement-breakpoint
ALTER TABLE `course_events` ADD `auxiliar` varchar(255);--> statement-breakpoint
ALTER TABLE `course_events` ADD `ID_auxiliar` varchar(100);