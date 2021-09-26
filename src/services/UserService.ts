import { UserScore } from "@/models/UserScore";
import { IUserScore } from "@/utils/enums/interfaces";

class UserService {
  async userVote(payload: IUserScore) {
    const { userId, taskId, score } = payload;

    try {
      const [userScore, created] = await UserScore.findOrCreate({
        where: { userId, taskId },
        defaults: {
          score,
        },
      });
      if (created) {
        return userScore.toJSON();
      } else {
        return (await UserScore.update(
          { score },
          {
            where: { id: userScore.get().id },
            returning: true,
          }
        ))[1][0].toJSON();
      }
    } catch(e) {
      console.log(`UserScore was not created / updated. ${e}.`);
    }
  }
}

export const userService = new UserService();
