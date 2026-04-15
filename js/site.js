(function () {
  var config = window.SiteConfig || {
    assetBasePath: "img",
    defaultLanguage: "en",
    site: {
      brandName: "LYJ Mold Solutions",
      legalName: {
        en: "Taizhou Kailong Mold & Plastic Co., Ltd.",
        zh: "台州凯隆模具塑料有限公司"
      },
      email: "sales@lyjmoldsolutions.com",
      emailUrl: "mailto:sales@lyjmoldsolutions.com",
      phone: "+86 15272583631",
      whatsappUrl: "https://wa.me/8615272583631",
      address: {
        en: {
          line1: "No. 1 Xincheng, Xicheng Street, Huangyan District",
          line2: "Taizhou, Zhejiang, China"
        },
        zh: {
          line1: "浙江省台州市黄岩区西城街道新城路1号",
          line2: "中国浙江台州"
        }
      },
      assets: {
        favicon: "logo/favicon.ico",
        logo: "logo/logo.png",
        logoWhite: "logo/logo-white.png",
        logoIcon: "logo/logo-icon.png"
      }
    }
  };

  function resolveAsset(relativePath) {
    if (!relativePath) {
      return "";
    }

    var base = (config.assetBasePath || "img").replace(/\/+$/, "");
    return base + "/" + relativePath.replace(/^\/+/, "");
  }

  function applySharedAssets() {
    document.querySelectorAll("[data-site-favicon]").forEach(function (el) {
      el.setAttribute("href", resolveAsset(config.site.assets.favicon));
    });

    document.querySelectorAll("[data-site-logo]").forEach(function (el) {
      el.setAttribute("src", resolveAsset(config.site.assets.logo));
    });

    document.querySelectorAll("[data-site-logo-white]").forEach(function (el) {
      el.setAttribute("src", resolveAsset(config.site.assets.logoWhite));
    });

    document.querySelectorAll("[data-site-logo-icon]").forEach(function (el) {
      el.setAttribute("src", resolveAsset(config.site.assets.logoIcon));
    });

    document.querySelectorAll("[data-asset]").forEach(function (el) {
      el.setAttribute("src", resolveAsset(el.getAttribute("data-asset")));
    });

    document.querySelectorAll("[data-bg-asset]").forEach(function (el) {
      el.style.backgroundImage = "url('" + resolveAsset(el.getAttribute("data-bg-asset")) + "')";
    });
  }

  function applySharedContacts() {
    document.querySelectorAll("[data-contact-email-link]").forEach(function (el) {
      el.setAttribute("href", config.site.emailUrl);
    });

    document.querySelectorAll("[data-contact-email-text]").forEach(function (el) {
      el.textContent = config.site.email;
    });

    document.querySelectorAll("[data-contact-phone-link]").forEach(function (el) {
      el.setAttribute("href", config.site.whatsappUrl);
    });

    document.querySelectorAll("[data-contact-phone-text]").forEach(function (el) {
      el.textContent = config.site.phone;
    });
  }

  function commonTranslations() {
    return {
      en: {
        brand_title: config.site.brandName,
        brand_subtitle: config.site.legalName.en,
        nav_home: "Home",
        nav_used: "Used Molds",
        nav_custom: "Custom Mold",
        nav_manufacturing: "Manufacturing",
        nav_about: "About",
        nav_contact: "Contact",
        lang_label: "English",
        lang_en: "English",
        lang_zh: "中文",
        footer_brand_text: "Used molds, custom mold development, and in-house manufacturing support for plastic product buyers.",
        footer_nav_title: "Navigation",
        footer_scope_title: "Services",
        footer_scope_1: "Used molds and ready molds",
        footer_scope_2: "Custom mold development",
        footer_scope_3: "In-house manufacturing support",
        footer_contact_title: "Contact",
        footer_company_name: config.site.legalName.en,
        footer_address_line1: config.site.address.en.line1,
        footer_address_line2: config.site.address.en.line2,
        footer_email_label: "Email",
        footer_phone_label: "Phone / WhatsApp",
        footer_copy: "Copyright " + config.site.brandName + ". All rights reserved.",
        footer_action_text: "Send drawings, samples, or product details for pricing and production discussion."
      },
      zh: {
        brand_title: config.site.brandName,
        brand_subtitle: config.site.legalName.zh,
        nav_home: "首页",
        nav_used: "二手模具",
        nav_custom: "定制模具",
        nav_manufacturing: "生产制造",
        nav_about: "关于我们",
        nav_contact: "联系我们",
        lang_label: "中文",
        lang_en: "English",
        lang_zh: "中文",
        footer_brand_text: "提供二手模具、定制模具开发和厂内注塑生产支持。",
        footer_nav_title: "网站导航",
        footer_scope_title: "服务内容",
        footer_scope_1: "二手模具与现成模具",
        footer_scope_2: "定制模具开发",
        footer_scope_3: "厂内生产支持",
        footer_contact_title: "联系方式",
        footer_company_name: config.site.legalName.zh,
        footer_address_line1: config.site.address.zh.line1,
        footer_address_line2: config.site.address.zh.line2,
        footer_email_label: "邮箱",
        footer_phone_label: "电话 / WhatsApp",
        footer_copy: config.site.brandName + " 版权所有。",
        footer_action_text: "欢迎发送图纸、样品或产品信息，沟通报价和生产安排。"
      }
    };
  }

  function mergeTranslations(lang) {
    var shared = commonTranslations()[lang] || {};
    var pageTranslations = window.pageTranslations || {};
    var page = pageTranslations[lang] || {};
    var merged = {};

    Object.keys(shared).forEach(function (key) {
      merged[key] = shared[key];
    });

    Object.keys(page).forEach(function (key) {
      merged[key] = page[key];
    });

    return merged;
  }

  function applyTranslations(lang) {
    var dictionary = mergeTranslations(lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dictionary[key] !== undefined) {
        el.textContent = dictionary[key];
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (dictionary[key] !== undefined) {
        el.innerHTML = dictionary[key];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (dictionary[key] !== undefined) {
        el.setAttribute("placeholder", dictionary[key]);
      }
    });

    if (window.pageMeta && window.pageMeta[lang]) {
      if (window.pageMeta[lang].title) {
        document.title = window.pageMeta[lang].title;
      }

      if (window.pageMeta[lang].description) {
        var meta = document.querySelector('meta[name="description"]');
        if (meta) {
          meta.setAttribute("content", window.pageMeta[lang].description);
        }
      }
    }

    var currentLabel = document.querySelector("[data-lang-current]");
    if (currentLabel) {
      currentLabel.textContent = lang === "zh" ? dictionary.lang_zh : dictionary.lang_en;
    }

    localStorage.setItem("lyj-language", lang);
  }

  function initLanguageSwitcher() {
    var switcher = document.querySelector("[data-lang-switcher]");
    var button = document.querySelector("[data-lang-button]");

    if (!switcher || !button) {
      return;
    }

    button.addEventListener("click", function () {
      switcher.classList.toggle("is-open");
    });

    document.querySelectorAll("[data-set-lang]").forEach(function (item) {
      item.addEventListener("click", function () {
        applyTranslations(item.getAttribute("data-set-lang"));
        switcher.classList.remove("is-open");
      });
    });

    document.addEventListener("click", function (event) {
      if (!switcher.contains(event.target)) {
        switcher.classList.remove("is-open");
      }
    });
  }

  function initNavigation() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var nav = document.querySelector("[data-nav]");

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        nav.classList.toggle("is-open");
      });
    }

    if (!window.sitePage) {
      return;
    }

    document.querySelectorAll("[data-nav-link]").forEach(function (link) {
      if (link.getAttribute("data-nav-link") === window.sitePage) {
        link.classList.add("is-active");
      }
    });
  }

  function initUsedMoldFilter() {
    var buttons = document.querySelectorAll("[data-filter]");
    if (!buttons.length) {
      return;
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var group = button.getAttribute("data-filter");

        buttons.forEach(function (other) {
          other.classList.toggle("is-active", other === button);
        });

        document.querySelectorAll("[data-filter-group]").forEach(function (card) {
          var show = group === "all" || card.getAttribute("data-filter-group") === group;
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applySharedAssets();
    applySharedContacts();
    initNavigation();
    initLanguageSwitcher();
    initUsedMoldFilter();
    applyTranslations(localStorage.getItem("lyj-language") || config.defaultLanguage || "en");
  });
})();
