import BasePage from "./base-page";
import { initHeroSlideshow } from "./modules/hero-slideshow";
import { initMarquees } from "./modules/marquee";
import { initTabs } from "./modules/tabs";
import { initCarousels } from "./modules/carousel";

class Home extends BasePage {
  onReady() {
    initHeroSlideshow();
    initMarquees();
    initTabs();
    initCarousels();
  }
}

Home.initiateWhenReady(['index']);
