const LikeService = require('@likes/services');

class LikeController {
  constructor() {
    this.likeService = new LikeService();
    this.indexBerita = this.indexBerita.bind(this);
    this.indexEvent = this.indexEvent.bind(this);
  }

  async indexBerita(req, res) {
    const result = await this.likeService.indexBerita(req.query);
    res.send(result);
  }

  async indexEvent(req, res) {
    const result = await this.likeService.indexEvent(req.query);
    res.send(result);
  }
}

module.exports = LikeController;
