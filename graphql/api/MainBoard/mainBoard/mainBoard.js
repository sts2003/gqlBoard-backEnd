import MainBoard from "../../../model/MainBoard";
import { CURRENT_TIME } from "../../../../src/utils/commonUtils";
export default {
  Query: {
    getAllMainBoards: async (_, args) => {
      const { searchValue, limit, currentPage } = args;
      try {
        const result = await MainBoard.find(
          {
            $or: [
              { title: { $regex: `.*${searchValue}.*` } },
              { description: { $regex: `.*${searchValue}.*` } },
            ],
          },
          {}
        )
          .sort({
            createdAt: -1,
          })
          .limit(limit)
          .skip(currentPage * limit);

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getMainDetail: async (_, args) => {
      const { id } = args;
      try {
        const result = await MainBoard.findOne({ _id: id });

        return result;
      } catch (e) {
        console.log(e);
        return {};
      }
    },

    getMainBoardTotalPage: async (_, args) => {
      const { searchValue, limit } = args;

      try {
        const result = await MainBoard.find({
          title: { $regex: `.*${searchValue}.*` },
        }).sort({
          createdAt: -1,
        });

        const cnt = result.length;

        const realTotalPage = cnt % limit > 0 ? cnt / limit + 1 : cnt / limit;

        return parseInt(realTotalPage);
      } catch (e) {
        console.log(e);
        return 0;
      }
    },
    getMainBoardTotalPageOnlyCnt: async (_, args) => {
      const { searchValue, limit } = args;

      try {
        const result = await MainBoard.find({
          title: { $regex: `.*${searchValue}.*` },
        }).sort({
          createdAt: -1,
        });

        const cnt = result.length;
        console.log(result);
        return parseInt(cnt);
      } catch (e) {
        console.log(e);
        return 0;
      }
    },
  },

  Mutation: {
    createMain: async (_, args) => {
      const createdAt = await CURRENT_TIME();
      const { title, description, imagePath } = args;
      try {
        const result = await MainBoard.create({
          title,
          description,
          imagePath,
          createdAt,
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    updateMain: async (_, args) => {
      const { id, title, description, imagePath } = args;
      try {
        const result = await MainBoard.updateOne(
          {
            _id: id,
          },
          {
            $set: {
              title,
              description,
              imagePath,
            },
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    deleteMain: async (_, args) => {
      const { id } = args;
      try {
        const result = await MainBoard.deleteOne({
          _id: id,
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
