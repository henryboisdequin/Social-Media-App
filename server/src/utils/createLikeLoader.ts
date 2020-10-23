import DataLoader from "dataloader";
import { Like } from "../entities/Like";

export const createLikeLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Like | null>(
    async (keys) => {
      const updoots = await Like.findByIds(keys as any);
      const updootIdsToUpdoots: Record<string, Like> = {};
      updoots.forEach((updoot) => {
        updootIdsToUpdoots[`${updoot.userId}|${updoot.postId}`] = updoot;
      });

      return keys.map(
        (key) => updootIdsToUpdoots[`${key.userId}|${key.postId}`]
      );
    }
  );
