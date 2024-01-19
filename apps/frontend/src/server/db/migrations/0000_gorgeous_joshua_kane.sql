CREATE TABLE `account` (
	`userId` text(255) NOT NULL,
	`type` text(255) NOT NULL,
	`provider` text(255) NOT NULL,
	`providerAccountId` text(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text(255),
	`scope` text(255),
	`id_token` text,
	`session_state` text(255),
	PRIMARY KEY(`provider`, `providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `aspenAssignments` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`classId` text NOT NULL,
	`name` text NOT NULL,
	`pointsPossible` real NOT NULL,
	`points` text NOT NULL,
	`extraCredit` integer DEFAULT false NOT NULL,
	`category` text NOT NULL,
	`feedback` text DEFAULT '' NOT NULL,
	`dateAssigned` integer NOT NULL,
	`dateDue` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`classId`) REFERENCES `classes`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `classes` (
	`id` text NOT NULL,
	`userId` text(255) NOT NULL,
	`name` text NOT NULL,
	`teachers` text,
	`gradeAverage` real NOT NULL,
	`gradeCategories` text,
	`schedule` text,
	`term` text DEFAULT 'FY',
	`teacherEmail` text NOT NULL,
	`aspenId` text,
	`canvasId` text,
	PRIMARY KEY(`aspenId`, `canvasId`, `userId`),
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255),
	`email` text(255) NOT NULL,
	`emailVerified` integer,
	`image` text(255),
	`canvasApiKey` text(255),
	`aspenUsername` text(255),
	`aspenPassword` text(255)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` text(255) NOT NULL,
	`token` text(255) NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `account_userId_unique` ON `account` (`userId`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `account` (`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `aspenAssignments_id_unique` ON `aspenAssignments` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `aspenAssignments_name_unique` ON `aspenAssignments` (`name`);--> statement-breakpoint
CREATE INDEX `userIdx` ON `aspenAssignments` (`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `classes_id_unique` ON `classes` (`id`);--> statement-breakpoint
CREATE INDEX `userIdx` ON `classes` (`userId`);--> statement-breakpoint
CREATE INDEX `aspenIdx` ON `classes` (`aspenId`);--> statement-breakpoint
CREATE INDEX `canvasIdx` ON `classes` (`canvasId`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `session` (`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_id_unique` ON `user` (`id`);