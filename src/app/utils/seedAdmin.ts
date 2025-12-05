import bcryptjs from "bcryptjs";
import config from "../../config";
import { prisma } from "../shared/prisma";
import { Role } from "../../generated";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await prisma.user.findUnique({
      where: {
        email: config.admin.super_admin_email as string,
      },
    });

    if (isSuperAdminExist) {
      console.log("Super admin already exist!");
      return;
    }

    const hashedPassword = await bcryptjs.hash(
      config.admin.super_admin_pass as string,
      10
    );

    const payload = {
      fullName: "Super Admin",
      email: config.admin.super_admin_email as string,
      role: Role.ADMIN,
      password: hashedPassword,
      verified: true,   
    };

    const superAdmin = await prisma.user.create({
      data:payload
    });
    console.log("Super Admin created Successfully!");
    console.log(superAdmin);
  } catch (error) {
    console.log(error);
  }
};
