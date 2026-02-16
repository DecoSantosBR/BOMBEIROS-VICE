CREATE TABLE `recruitment_applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`discordId` varchar(64) NOT NULL,
	`discordUsername` varchar(255) NOT NULL,
	`nome` varchar(255) NOT NULL,
	`idViceCity` varchar(100) NOT NULL,
	`telefone` varchar(50) NOT NULL,
	`idade` int NOT NULL,
	`interesse` text NOT NULL,
	`possuiMicrofone` enum('sim','nao') NOT NULL,
	`cienteProibicoes` enum('sim','nao') NOT NULL,
	`desobedeceriaOrdem` text NOT NULL,
	`situacaoTiroteio` text NOT NULL,
	`situacaoOutroChamado` text NOT NULL,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`discordMessageId` varchar(64),
	`reviewedBy` int,
	`reviewedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `recruitment_applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `matricula`;