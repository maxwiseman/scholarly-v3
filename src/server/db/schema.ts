import { relations } from "drizzle-orm";
import {
  index,
  int,
  primaryKey,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const users = sqliteTable("user", {
  id: text("id", { length: 255 }).notNull().primaryKey().unique(),
  name: text("name", { length: 255 }),
  email: text("email", { length: 255 }).notNull(),
  emailVerified: int("emailVerified", {
    mode: "timestamp",
  }),
  image: text("image", { length: 255 }),
  canvasApiKey: text("canvasApiKey", { length: 255 }),
  aspenUsername: text("aspenUsername", { length: 255 }),
  aspenPassword: text("aspenPassword", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  classes: many(classes),
  aspenAssignments: many(classes),
}));

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId", { length: 255 }).notNull().unique(),
    type: text("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: text("provider", { length: 255 }).notNull(),
    providerAccountId: text("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: text("token_type", { length: 255 }),
    scope: text("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: text("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = sqliteTable(
  "session",
  {
    sessionToken: text("sessionToken", { length: 255 }).notNull().primaryKey(),
    userId: text("userId", { length: 255 }).notNull(),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier", { length: 255 }).notNull(),
    token: text("token", { length: 255 }).notNull(),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export const classes = sqliteTable(
  "classes",
  {
    id: text("id").notNull().primaryKey().unique(),
    userId: text("userId", { length: 255 })
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    name: text("name").notNull(),
    teachers: text("teachers", { mode: "json" }).$type<string[]>(),
    gradeAverage: real("gradeAverage").notNull(),
    gradeCategories: text("gradeCategories", { mode: "json" }).$type<
      { name: string; weight: number; value: number }[]
    >(),
    schedule: text("schedule"),
    term: text("term").default("FY"),
    teacherEmail: text("teacherEmail").notNull(),
    aspenId: text("aspenId"),
    canvasId: text("canvasId"),
  },
  (table) => {
    return {
      userIdx: index("userIdx").on(table.userId),
      aspenIdx: index("aspenIdx").on(table.aspenId),
      canvasIdx: index("canvasIdx").on(table.canvasId),
    };
  },
);

export const classesRelations = relations(classes, ({ one, many }) => ({
  user: one(users, {
    fields: [classes.userId],
    references: [users.id],
  }),
  aspenAssignments: many(aspenAssignments),
}));

export const aspenAssignments = sqliteTable(
  "aspenAssignments",
  {
    id: text("id").notNull().primaryKey().unique(),
    userId: text("userId")
      .references(() => users.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    classId: text("classId")
      .references(() => classes.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    name: text("name").notNull().unique(),
    pointsPossible: real("pointsPossible").notNull(),
    points: text("points", { mode: "json" }).$type<string | number>().notNull(),
    extraCredit: int("extraCredit", { mode: "boolean" })
      .default(false)
      .notNull(),
    category: text("category").notNull(),
    feedback: text("feedback").default("").notNull(),
    dateAssigned: int("dateAssigned", { mode: "timestamp" }).notNull(),
    dateDue: int("dateDue", { mode: "timestamp" }).notNull(),
  },
  (table) => {
    return {
      userIdx: index("userIdx").on(table.userId),
    };
  },
);

export const aspenAssignmentsRelations = relations(
  aspenAssignments,
  ({ one }) => ({
    user: one(users, {
      fields: [aspenAssignments.userId],
      references: [users.id],
    }),
    class: one(classes, {
      fields: [aspenAssignments.classId],
      references: [classes.id],
    }),
  }),
);
