// components/RouterEventsHandler.jsx
"use client"; // Bu bileşen client-side'da çalışacak
import Router from "next/router";
import nProgress from "nprogress";
import { useEffect } from "react";

const RouterEventsHandler = () => {
    useEffect(() => {
        Router.events.on("routeChangeStart", () => nProgress.start());
        Router.events.on("routeChangeComplete", () => nProgress.done());
        Router.events.on("routeChangeError", () => nProgress.done());

        return () => {
            Router.events.off("routeChangeStart", () => nProgress.start());
            Router.events.off("routeChangeComplete", () => nProgress.done());
            Router.events.off("routeChangeError", () => nProgress.done());
        };
    }, []);

    return null; // Bu bileşen sadece event'leri dinler, render edilen bir şey yok.
};

export default RouterEventsHandler;
