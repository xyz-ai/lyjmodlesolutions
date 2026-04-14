(function () {
  var COMMON_TRANSLATIONS = {
    en: {
      brand_title: "LYJ Mold Solutions",
      brand_subtitle: "Taizhou Kailong Mold & Plastic Co., Ltd.",
      nav_home: "Home",
      nav_used: "Used Molds",
      nav_custom: "Custom Mold",
      nav_manufacturing: "Manufacturing",
      nav_about: "About",
      nav_contact: "Contact",
      lang_label: "English",
      lang_en: "English",
      lang_zh: "中文",
      footer_brand_text: "Export-oriented mold and plastic production support for buyers looking for used molds, custom mold development, and injection manufacturing in China.",
      footer_nav_title: "Navigation",
      footer_scope_title: "Business Scope",
      footer_scope_1: "Used molds and ready molds",
      footer_scope_2: "Custom injection mold development",
      footer_scope_3: "Plastic injection manufacturing",
      footer_contact_title: "Contact",
      footer_company_name: "Taizhou Kailong Mold & Plastic Co., Ltd.",
      footer_address_line1: "No. 1 Xincheng, Xicheng Street, Huangyan District",
      footer_address_line2: "Taizhou, Zhejiang, China",
      footer_action_title: "Inquiry",
      footer_action_text: "Send product photos, drawings, sample details, or required quantities by email or WhatsApp for a faster quotation.",
      footer_email_label: "Email",
      footer_phone_label: "Phone / WhatsApp",
      footer_copy: "© LYJ Mold Solutions. All rights reserved."
    },
    zh: {
      brand_title: "LYJ Mold Solutions",
      brand_subtitle: "台州凯隆模具塑料有限公司",
      nav_home: "首页",
      nav_used: "二手模具",
      nav_custom: "定制模具",
      nav_manufacturing: "注塑生产",
      nav_about: "关于我们",
      nav_contact: "联系我们",
      lang_label: "中文",
      lang_en: "English",
      lang_zh: "中文",
      footer_brand_text: "面向出口客户提供二手模具、定制注塑模具开发与塑料注塑生产支持。",
      footer_nav_title: "网站导航",
      footer_scope_title: "业务范围",
      footer_scope_1: "二手模具与现成模具",
      footer_scope_2: "定制注塑模具开发",
      footer_scope_3: "塑料注塑生产",
      footer_contact_title: "联系方式",
      footer_company_name: "台州凯隆模具塑料有限公司",
      footer_address_line1: "浙江省台州市黄岩区西城街道新城路1号",
      footer_address_line2: "中国浙江台州",
      footer_action_title: "询盘方式",
      footer_action_text: "可通过邮箱或 WhatsApp 发送产品图片、图纸、样品信息或需求数量，以便更快报价。",
      footer_email_label: "邮箱",
      footer_phone_label: "电话 / WhatsApp",
      footer_copy: "© LYJ Mold Solutions 版权所有。"
    }
  };

  function mergeTranslations(lang) {
    var pageTranslations = window.pageTranslations || {};
    var pageLang = pageTranslations[lang] || {};
    var commonLang = COMMON_TRANSLATIONS[lang] || {};
    var merged = {};
    Object.keys(commonLang).forEach(function (key) {
      merged[key] = commonLang[key];
    });
    Object.keys(pageLang).forEach(function (key) {
      merged[key] = pageLang[key];
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
      var htmlKey = el.getAttribute("data-i18n-html");
      if (dictionary[htmlKey] !== undefined) {
        el.innerHTML = dictionary[htmlKey];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var placeholderKey = el.getAttribute("data-i18n-placeholder");
      if (dictionary[placeholderKey] !== undefined) {
        el.setAttribute("placeholder", dictionary[placeholderKey]);
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

    var label = document.querySelector("[data-lang-current]");
    if (label) {
      label.textContent = lang === "zh" ? dictionary.lang_zh : dictionary.lang_en;
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

    document.querySelectorAll("[data-set-lang]").forEach(function (langButton) {
      langButton.addEventListener("click", function () {
        var lang = langButton.getAttribute("data-set-lang");
        applyTranslations(lang);
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

    var currentPage = window.sitePage;
    if (!currentPage) {
      return;
    }

    document.querySelectorAll("[data-nav-link]").forEach(function (link) {
      if (link.getAttribute("data-nav-link") === currentPage) {
        link.classList.add("is-active");
      }
    });
  }

  function initUsedMoldFilter() {
    var filterButtons = document.querySelectorAll("[data-filter]");
    if (!filterButtons.length) {
      return;
    }

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var target = button.getAttribute("data-filter");

        filterButtons.forEach(function (otherButton) {
          otherButton.classList.toggle("is-active", otherButton === button);
        });

        document.querySelectorAll("[data-filter-group]").forEach(function (card) {
          var group = card.getAttribute("data-filter-group");
          var show = target === "all" || target === group;
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var storedLanguage = localStorage.getItem("lyj-language");
    var defaultLanguage = storedLanguage || "en";
    initNavigation();
    initLanguageSwitcher();
    initUsedMoldFilter();
    applyTranslations(defaultLanguage);
  });
})();
