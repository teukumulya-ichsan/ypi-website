const LikeModel = require('@likes/models');

class LikeService {
  constructor() {
    this.likeModel = new LikeModel();
  }

  async indexBerita(query) {
    const search = query.query;
    const sortBy = query.sort_by;
    const order = query.order;

    const likeBerita = await this.likeModel.indexBerita(search, sortBy, order);

    return {
      data: likeBerita
    };
  }

  async indexEvent(query) {
    const search = query.query;
    const sortBy = query.sort_by;
    const order = query.order;

    const likeEvent = await this.likeModel.indexEvent(search, sortBy, order);

    return {
      data: likeEvent
    };
  }
}

module.exports = LikeService;
