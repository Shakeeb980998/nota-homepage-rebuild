import type { Core } from '@strapi/strapi';

import fs from 'fs';
import path from 'path';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // 1. Automatically enable public permissions for homepage, global, and form submissions
    try {
      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (publicRole) {
        const permissions = [
          { action: 'api::homepage.homepage.find', role: publicRole.id },
          { action: 'api::global.global.find', role: publicRole.id },
          { action: 'api::form-submission.form-submission.create', role: publicRole.id },
        ];

        for (const perm of permissions) {
          const exists = await strapi
            .query('plugin::users-permissions.permission')
            .findOne({ where: perm });
          if (!exists) {
            await strapi.query('plugin::users-permissions.permission').create({
              data: perm,
            });
          }
        }
      }
    } catch (err) {
      console.warn('Could not auto-assign public permissions:', err);
    }

    // 2. Automatically ensure Reviewer Admin accounts exist or can be seeded
    const reviewers = [
      {
        email: 'kavinda.kobbekaduwe@surge.global',
        firstname: 'Kavinda',
        lastname: 'Kobbekaduwe',
        username: 'kavinda_surge',
      },
      {
        email: 'kavisha@surge.global',
        firstname: 'Kavisha',
        lastname: 'Surge',
        username: 'kavisha_surge',
      },
      {
        email: 'samith@surge.global',
        firstname: 'Samith',
        lastname: 'Surge',
        username: 'samith_surge',
      },
    ];

    try {
      const superAdminRole = await strapi
        .query('admin::role')
        .findOne({ where: { code: 'strapi-super-admin' } });

      if (superAdminRole) {
        for (const rev of reviewers) {
          const existingUser = await strapi
            .query('admin::user')
            .findOne({ where: { email: rev.email } });

          if (!existingUser) {
            const password = 'SurgeReviewer2026!';
            const hashedPassword = await strapi.service('admin::auth').hashPassword(password);

            await strapi.query('admin::user').create({
              data: {
                email: rev.email,
                firstname: rev.firstname,
                lastname: rev.lastname,
                username: rev.username,
                password: hashedPassword,
                roles: [superAdminRole.id],
                isActive: true,
                blocked: false,
              },
            });
            console.log(`[Admin Seeder] Verified admin account: ${rev.email}`);
          }
        }
      }
    } catch (err) {
      console.warn('Admin user auto-seed info:', err);
    }
  },
};
