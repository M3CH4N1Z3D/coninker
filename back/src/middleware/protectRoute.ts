import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { AppDataSource } from "../database/data-source";
import { Admin } from "../modules/admins/entities/admin.entity";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET!,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const adminRepository = AppDataSource.getRepository(Admin);
      const admin = await adminRepository.findOne({
        where: { id: payload.id },
      });

      if (admin) {
        return done(null, admin);
      }

      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

export const protect = passport.authenticate("jwt", { session: false });
