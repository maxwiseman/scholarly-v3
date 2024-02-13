CREATE TABLE `readingChapter` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`number` text NOT NULL,
	`readingId` text NOT NULL,
	`name` text NOT NULL,
	`content` text NOT NULL,
	FOREIGN KEY (`readingId`) REFERENCES `reading`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `reading` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`chapters` text NOT NULL
);
--> statement-breakpoint
/*
 SQLite does not support "Drop not null from column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
CREATE UNIQUE INDEX `readingChapter_id_unique` ON `readingChapter` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `reading_id_unique` ON `reading` (`id`);