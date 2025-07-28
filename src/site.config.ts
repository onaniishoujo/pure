import type { CardListData, Config, IntegrationUserConfig, ThemeUserConfig } from 'astro-pure/types'

let timeDate = 0
let times = ''
// function runforTime(){
var start: any = new Date("2023/08/31 00:00:00");

function runforTime() {
  var now: any = new Date();
  now.setTime(now.getTime()+250);
  var days = (now - start) / 1000 / 60 / 60 / 24;
  var dnum = Math.floor(days);
  var hours = (now - start) / 1000 / 60 / 60 - (24 * dnum);
  var hnum: any = Math.floor(hours);
  if(String(hnum).length === 1 ){
    hnum = "0" + hnum;
  }
  var minutes = (now - start) / 1000 /60 - (24 * 60 * dnum) - (60 * hnum);
  var mnum: any = Math.floor(minutes);
  if(String(mnum).length === 1 ){
    mnum = "0" + mnum;
  }
  var seconds = (now - start) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum);
  var snum: any = Math.round(seconds);
  if(String(snum).length === 1 ){
    snum = "0" + snum;
  }
  timeDate = dnum;
  times = hnum + "h " + mnum + "m " + snum + "s ";
}
runforTime();

let initVisitors = 1068;
let initPageviews = 2314;
let umamiEnd = new Date().getTime();
let umamiHeader = {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "x-umami-api-key": "api_d3HhUeSF6DyMmOq6FpKY8JaZ4rzHIhh9",
    },
};
let counter_uv: string | number = ''
let counter_pv: string | number = ''
const umamiResponse = await fetch("https://api.umami.is/v1/websites/312fc71b-66cf-492a-a31f-d51d17c3e528/sessions/stats?startAt=1752483669&endAt=" + umamiEnd, umamiHeader)
const umamiData = await umamiResponse.json()
counter_uv = umamiData.visitors.value + initVisitors
counter_pv = umamiData.pageviews.value + initPageviews


export const theme: ThemeUserConfig = {
  // === Basic configuration ===
  /** Title for your website. Will be used in metadata and as browser tab title. */
  title: '少女的Blog',
  /** Will be used in index page & copyright declaration */
  author: '少女',
  /** Description metadata for your website. Can be used in page metadata. */
  // description: 'Stay hungry, stay foolish',
  /** The default favicon for your site which should be a path to an image in the `public/` directory. */
  favicon: '/favicon/favicon.ico',
  /** Specify the default language for this site. */
  locale: {
    lang: 'en-US',
    attrs: 'en-US',
    // Date locale
    dateLocale: 'en-US',
    dateOptions: {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  },
  /** Set a logo image to show in the homepage. */
  logo: {
    src: 'src/assets/avatar.jpg',
    alt: 'Avatar'
  },

  // === Global configuration ===
  titleDelimiter: '•',
  prerender: true,
  npmCDN: 'https://cdn.jsdelivr.net/npm',

  // Still in test
  head: [
    /* Telegram channel */
    // {
    //   tag: 'meta',
    //   attrs: { name: 'telegram:channel', content: '@cworld0_cn' },
    //   content: ''
    // }
  ],
  customCss: [],

  /** Configure the header of your site. */
  header: {
    menu: [
      { title: 'Blog', link: '/blog' },
      // { title: 'Projects', link: '/projects' },
      { title: 'Links', link: '/links' },
      { title: 'About', link: '/about' },
      { title: 'Praline', link: '/praline' },
    ]
  },

  /** Configure the footer of your site. */
  footer: {
    // Year format
    year: `© ${new Date().getFullYear()}`,
    // year: `© 2019 - ${new Date().getFullYear()}`,
    links: [
      // // Registration link
      // {
      //   title: 'Moe ICP 114514',
      //   link: 'https://icp.gov.moe/?keyword=114514',
      //   style: 'text-sm' // Uno/TW CSS class
      // },
      {
        title: 'Running for ' + timeDate + 'd ' + times,
        link: '/',
        style: 'text-sm' // Uno/TW CSS class
      },
      {
        title: counter_uv + ' Visitors ' + counter_pv + ' Views',
        link: '/',
        style: 'text-sm' // Uno/TW CSS class
      },
      // {
      //   title: 'Travelling',
      //   link: 'https://www.travellings.cn/go.html',
      //   style: 'text-sm'
      // },
      // // Privacy Policy link
      // {
      //   title: 'Site Policy',
      //   link: '/terms/list',
      //   pos: 2 // position set to 2 will be appended to copyright line
      // }
    ],
    /** Enable displaying a “Astro & Pure theme powered” link in your site’s footer. */
    credits: true,
    /** Optional details about the social media accounts for this site. */
    social: { github: 'https://github.com/onaniishoujo' }
  },

  content: {
    externalLinksContent: ' ↗',
    /** Blog page size for pagination (optional) */
    blogPageSize: 8,
    externalLinkArrow: true, // show external link arrow
    // Currently support weibo, x, bluesky
    share: ['weibo', 'x', 'bluesky']
  }
}

export const integ: IntegrationUserConfig = {
  // Links management
  // See: https://astro-pure.js.org/docs/integrations/links
  links: {
    // Friend logbook
    logbook: [
      { date: '2024-07-01', content: 'Lorem ipsum dolor sit amet.' },
      { date: '2024-07-01', content: 'vidit suscipit at mei.' },
      { date: '2024-07-01', content: 'Quem denique mea id.' }
    ],
    // Yourself link info
    applyTip: [
      { name: 'Name', val: theme.title },
      { name: 'Desc', val: theme.description || 'Null' },
      { name: 'Link', val: 'https://onaniishoujo.github.io/' },
      { name: 'Avatar', val: 'src/assets/avatar.jpg' }
    ]
  },
  // Enable page search function
  pagefind: true,
  // Add a random quote to the footer (default on homepage footer)
  // See: https://astro-pure.js.org/docs/integrations/advanced#web-content-render
  quote: {
    // https://developer.hitokoto.cn/sentence/#%E8%AF%B7%E6%B1%82%E5%9C%B0%E5%9D%80
    server: 'https://v1.hitokoto.cn/?c=d&c=k',
    // server: 'https://api.yyy001.com/api/quote',
    // target: (data) => (data as { hitokoto: string }).hitokoto || 'Error'
    // https://github.com/lukePeavey/quotable
    // server: 'https://api.quotable.io/quotes/random?maxLength=60',
    target: `(data) => data.hitokoto || 'Error'`
  },
  // UnoCSS typography
  // See: https://unocss.dev/presets/typography
  typography: {
    class: 'prose text-base text-muted-foreground',
    // The style of blockquote font, normal or italic (default to italic in typography)
    blockquoteStyle: 'italic',
    // The style of inline code block, code or modern (default to code in typography)
    inlineCodeBlockStyle: 'modern'
  },
  // A lightbox library that can add zoom effect
  // See: https://astro-pure.js.org/docs/integrations/others#medium-zoom
  mediumZoom: {
    enable: true, // disable it will not load the whole library
    selector: '.prose .zoomable',
    options: {
      className: 'zoomable'
    }
  },
  // Comment system
  waline: {
    enable: true,
    // Server service link
    server: 'https://waline.shoujo.ggff.net/',
    // Refer https://waline.js.org/en/guide/features/emoji.html
    emoji: ['bmoji', 'weibo'],
    // Refer https://waline.js.org/en/reference/client/props.html
    additionalConfigs: {
      search: false,
      pageview: true,
      comment: true,
      locale: {
        reaction0: 'Like',
        placeholder: 'Welcome to comment. (Email to receive replies. Login is unnecessary)'
      },
      imageUploader: false
    }
  }
}

export const terms: CardListData = {
  title: 'Terms content',
  list: [
    {
      title: 'Privacy Policy',
      link: '/terms/privacy-policy'
    },
    {
      title: 'Terms and Conditions',
      link: '/terms/terms-and-conditions'
    },
    {
      title: 'Copyright',
      link: '/terms/copyright'
    },
    {
      title: 'Disclaimer',
      link: '/terms/disclaimer'
    }
  ]
}

const config = { ...theme, integ } as Config
export default config
