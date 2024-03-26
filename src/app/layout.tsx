"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import AppBar from "@/components/AppBar";
import SideBar from "@/components/SideBar";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/components/Theme";
import { MyContexLayout } from "./context";
import { useState } from "react";
import { ErrorModal } from "@/components/Modal/ErrorModal";
import ModalSuccess from "@/components/Modal/ModalSuccess";
import ModalDecision from "@/components/Modal/ModalDecision";

const inter = Inter({ subsets: ["latin"] });

const clearObjet = {
  type: "none" as "none",
  title: "",
  body: <></>,
  isOpen: false,
  onClose: () => null,
  onConfirm: () => null,
  onRetry: () => null,
  props: {},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [modalState, setModalState] = useState<{
    type: "success" | "error" | "decision" | "none";
    title: string;
    body?: React.ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    onRetry?: () => void;
    props?: any;
  }>(clearObjet);

  return (
    <html lang="en">
      <body style={{ background: "#fffffff !important" }}>
        <ThemeProvider theme={theme}>
          <MyContexLayout.Provider value={{ setModalState }}>
            <AppBar />
            <div style={{ display: "flex", maxWidth: "100vw" }}>
              <SideBar />
              {children}
            </div>

            {/* ///////////////////////Modal Error///////////////////////// */}
            <ErrorModal
              title={modalState?.title}
              body={modalState?.body}
              withoutClose
              onClose={() => {
                modalState?.onClose && modalState.onClose();
                setModalState(clearObjet);
              }}
              onRetry={() => {
                modalState?.onRetry && modalState.onRetry();
                setModalState(clearObjet);
              }}
              open={modalState?.isOpen && modalState.type === "error"}
            />
            {/* /////////////////////////////////////////////////////////// */}

            {/* ///////////////////////Modal Success///////////////////////// */}
            <ModalSuccess
              isOpen={modalState?.isOpen && modalState.type === "success"}
              onClose={() => {
                modalState?.onConfirm && modalState.onConfirm();
                setModalState(clearObjet);
              }}
              title="Área Creada Exitosamente"
              body={modalState?.body}
            />
            {/* /////////////////////////////////////////////////////////// */}

            {/* ///////////////////////Modal Decision///////////////////////// */}
            <ModalDecision
              isOpen={modalState?.isOpen && modalState.type === "decision"}
              onClose={() => {
                modalState?.onClose && modalState.onClose();
                setModalState(clearObjet);
              }}
              onConfirm={async () => {
                modalState?.onConfirm && (await modalState.onConfirm());
                setModalState(clearObjet);
              }}
              title={modalState?.title}
              body={modalState?.body}
            />
            {/* /////////////////////////////////////////////////////////// */}
          </MyContexLayout.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
