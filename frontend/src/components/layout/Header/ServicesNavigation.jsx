import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

import styles from "./ServicesNavigation.module.css";

function ServicesNavigation({ mobile = false, onNavigate }) {
  const { t } = useTranslation();
  const { pathname, hash } = useLocation();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [weddingsOpen, setWeddingsOpen] = useState(false);
  const group = useRef(null);
  const servicesLink = useRef(null);
  const weddingsLink = useRef(null);
  const timer = useRef(null);
  const suppressServicesFocus = useRef(false);
  const suppressWeddingsFocus = useRef(false);
  const prefix = mobile ? "mobile" : "desktop";
  const weddings = pathname === "/services/weddings";
  const active = pathname === "/services" || pathname.startsWith("/services/");

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const close = () => {
    setServicesOpen(false);
    setWeddingsOpen(false);
  };
  const navigate = () => {
    suppressServicesFocus.current = true;
    suppressWeddingsFocus.current = true;
    close();
    onNavigate?.();
  };
  const open = () => {
    window.clearTimeout(timer.current);
    suppressServicesFocus.current = false;
    setServicesOpen(true);
  };
  const label = (expanded, section) => t(expanded ? "navigation.collapse" : "navigation.expand", { section: t(`navigation.${section}`) });

  return (
    <div
      ref={group}
      className={`${styles.group} ${mobile ? styles.mobile : styles.desktop}`}
      onPointerEnter={mobile ? undefined : open}
      onPointerLeave={mobile ? undefined : () => {
        timer.current = window.setTimeout(() => {
          if (!group.current?.contains(document.activeElement)) close();
        }, 180);
      }}
      onFocusCapture={mobile ? undefined : () => {
        window.clearTimeout(timer.current);
        if (!suppressServicesFocus.current) setServicesOpen(true);
      }}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          close();
          suppressServicesFocus.current = false;
          suppressWeddingsFocus.current = false;
        }
      }}
      onKeyDown={event => {
        if (event.key === "Escape" && servicesOpen) {
          event.preventDefault();
          event.stopPropagation();
          if (weddingsOpen) {
            suppressWeddingsFocus.current = true;
            setWeddingsOpen(false);
            weddingsLink.current?.focus();
          } else {
            suppressServicesFocus.current = true;
            close();
            servicesLink.current?.focus();
          }
        }
      }}
    >
      <div className={styles.row}>
        <NavLink ref={servicesLink} to="/services" end data-active={active} className={styles.parentLink} onClick={navigate}>
          {mobile && <span className={styles.number}>03</span>}
          {t("navigation.services")}
        </NavLink>
        <button type="button" className={styles.toggle} aria-label={label(servicesOpen, "services")} aria-expanded={servicesOpen} aria-controls={`${prefix}-services-submenu`} onClick={() => {
          suppressServicesFocus.current = true;
          setServicesOpen(current => !current);
          setWeddingsOpen(false);
        }}>
          <FiChevronDown aria-hidden="true" />
        </button>
      </div>

      <div id={`${prefix}-services-submenu`} className={styles.panel} hidden={!servicesOpen}>
        <div
          className={styles.weddingsGroup}
          onPointerEnter={mobile ? undefined : () => {
            suppressWeddingsFocus.current = false;
            setWeddingsOpen(true);
          }}
          onFocusCapture={mobile ? undefined : () => {
            if (!suppressWeddingsFocus.current) setWeddingsOpen(true);
          }}
        >
          <div className={styles.row}>
            <NavLink ref={weddingsLink} to="/services/weddings" end className={styles.childLink} onClick={navigate}>
              {t("navigation.weddings")}
            </NavLink>
            <button type="button" className={styles.toggle} aria-label={label(weddingsOpen, "weddings")} aria-expanded={weddingsOpen} aria-controls={`${prefix}-weddings-submenu`} onClick={() => {
              suppressWeddingsFocus.current = true;
              setWeddingsOpen(current => !current);
            }}>
              {mobile ? <FiChevronDown aria-hidden="true" /> : <FiChevronRight aria-hidden="true" />}
            </button>
          </div>
          <div id={`${prefix}-weddings-submenu`} className={`${styles.panel} ${styles.nested}`} hidden={!weddingsOpen}>
            <Link className={styles.childLink} to="/services/weddings#recommended-professionals" aria-current={weddings && hash === "#recommended-professionals" ? "location" : undefined} onClick={navigate}>
              {t("navigation.professionals")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesNavigation;
