"use client";
import Head from "next/head";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms & Services | TubeGate</title>
        <meta
          name="description"
          content="Terms and Services of TubeGate platform."
        />
      </Head>

      <main className="min-h-screen bg-black text-gray-100 pt-16">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/10 via-transparent to-purple-900/5"></div>

        <div className="relative z-10 px-6 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="text-center mb-16 space-y-6">
              <h1 className="text-5xl md:text-6xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">
                  Terms & Services
                </span>
              </h1>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1 max-w-32"></div>
                <p className="text-purple-400 font-medium text-sm tracking-wider uppercase">
                  Last updated: June 1, 2025
                </p>
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1 max-w-32"></div>
              </div>
            </header>

            {/* Main content */}
            <div className="bg-gray-950/80 border border-gray-800/50 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-2xl shadow-purple-900/10">
              {/* Introduction */}
              <div className="mb-12 p-6 bg-gradient-to-r from-purple-950/30 to-purple-900/20 rounded-2xl border border-purple-800/20">
                <p className="text-purple-200 text-lg leading-relaxed text-center">
                  Welcome to TubeGate. Please read these terms carefully before
                  using our platform.
                </p>
              </div>

              <div className="space-y-10">
                {/* Section 1 */}
                <section className="group">
                  <div className="flex items-start gap-4 p-6 rounded-2xl hover:bg-gray-900/50 transition-colors duration-200">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      01
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-purple-300 mb-4 group-hover:text-purple-200 transition-colors">
                        Acceptance of Terms
                      </h2>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        By accessing or using TubeGate, you agree to be bound by
                        these Terms and all applicable laws and regulations. If
                        you do not agree, you are prohibited from using the
                        platform.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 2 */}
                <section className="group">
                  <div className="flex items-start gap-4 p-6 rounded-2xl hover:bg-gray-900/50 transition-colors duration-200">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      02
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-purple-300 mb-4 group-hover:text-purple-200 transition-colors">
                        Use License
                      </h2>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        You are granted a limited, non-transferable, revocable
                        license to use TubeGate for personal or commercial use
                        under the outlined terms.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 3 */}
                <section className="group">
                  <div className="flex items-start gap-4 p-6 rounded-2xl hover:bg-gray-900/50 transition-colors duration-200">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      03
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-purple-300 mb-4 group-hover:text-purple-200 transition-colors">
                        User Responsibilities
                      </h2>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        You agree not to misuse the service or attempt
                        unauthorized access to other users' data. Violations may
                        result in suspension or termination of your access.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 4 */}
                <section className="group">
                  <div className="flex items-start gap-4 p-6 rounded-2xl hover:bg-gray-900/50 transition-colors duration-200">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      04
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-purple-300 mb-4 group-hover:text-purple-200 transition-colors">
                        Content Ownership
                      </h2>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        Users retain ownership of their content. By uploading
                        content to TubeGate, you grant us a license to display,
                        distribute, and promote your content on the platform.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 5 */}
                <section className="group">
                  <div className="flex items-start gap-4 p-6 rounded-2xl hover:bg-gray-900/50 transition-colors duration-200">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      05
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-purple-300 mb-4 group-hover:text-purple-200 transition-colors">
                        Termination
                      </h2>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        We reserve the right to suspend or terminate access to
                        TubeGate at any time, without notice, for conduct that
                        violates these Terms.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 6 */}
                <section className="group">
                  <div className="flex items-start gap-4 p-6 rounded-2xl hover:bg-gray-900/50 transition-colors duration-200">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      06
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-purple-300 mb-4 group-hover:text-purple-200 transition-colors">
                        Changes to Terms
                      </h2>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        TubeGate may revise these Terms at any time. Continued
                        use of the platform after changes means you accept the
                        new terms.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 7 - Contact */}
                <section className="group">
                  <div className="flex items-start gap-4 p-6 rounded-2xl hover:bg-gray-900/50 transition-colors duration-200">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      07
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-purple-300 mb-4 group-hover:text-purple-200 transition-colors">
                        Contact
                      </h2>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        If you have any questions about these Terms, feel free
                        to contact us at{" "}
                        <a
                          href="mailto:syedsamar405@gmail.com"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                        >
                          support@TubeGate.com
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </a>
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Footer */}
            <footer className="text-center mt-16">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900/50 border border-gray-800/50 rounded-full">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                <p className="text-purple-400 font-medium text-sm">
                  Thank you for choosing TubeGate
                </p>
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </>
  );
}
