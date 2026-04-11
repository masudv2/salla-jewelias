import BasePage from "./base-page";
import { initHeroSlideshow } from "./modules/hero-slideshow";
import { initMarquees } from "./modules/marquee";
import { initTabs } from "./modules/tabs";
import { initCarousels } from "./modules/carousel";
import { initShopTheLook } from "./modules/shop-the-look";
import { initMediaGallery } from "./modules/media-gallery";

class Home extends BasePage {
  onReady() {
    initHeroSlideshow();
    initMarquees();
    initTabs();
    initCarousels();
    initShopTheLook();
    initMediaGallery();
  }
}

Home.initiateWhenReady(['index']);
