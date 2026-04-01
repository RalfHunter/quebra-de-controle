const routes = [
  {
    id: "security-login",
    method: "POST",
    path: "/security/login",
    defaultUrl: "http://localhost:3010/security/login",
    description:
      "Login da area security. Espera JSON com email e senha e retorna token quando valido.",
    defaultBody: {
      email: "admin@email.com",
      password: "123456"
    }
  },
  
  {
    id: "not-security-login",
    method: "POST",
    path: "/not-security/login",
    defaultUrl: "http://localhost:3010/not-security/login",
    description:
      "O login atual se encaixa da CWE - 200 quando informações sensiveis são expostas a um agente não autorizado,",
    defaultBody: {
      email: "admin@email.com",
      password: "123456"
    }
  },
    {
    id: "security-users",
    method: "GET",
    path: "/security/users",
    defaultUrl: "http://localhost:3010/security/users",
    description:
      "O login atual resolve a falha de segurança do anterior, devolvendo uma mensagem de erro que não expõnha informações relevantes ao atacante.",
    defaultBody: null
  },
  {
    id: "security-users-id",
    method: "GET",
    path: "/security/users/:id",
    defaultUrl: "http://localhost:3010/security/users/00000000-0000-0000-0000-000000000000",
    description:
      "Busca usuario por UUID na area security. Trocar :id pelo UUID valido.",
    defaultBody: null
  },
  {
    id: "security-me",
    method: "GET",
    path: "/security/me",
    defaultUrl: "http://localhost:3010/security/me",
    description:
      "Consulta o usuario autenticado da area security. Necessita Authorization Bearer.",
    defaultBody: null
  },
    {
    id: "not-security-me",
    method: "GET",
    path: "/not-security/me",
    defaultUrl: "http://localhost:3010/not-security/me",
    description:
      "Consulta usuario na area sem seguranca. Usa middleware alternativo.",
    defaultBody: null
  },

  {
    id: "security-dados",
    method: "GET",
    path: "/security/dados?url=...",
    defaultUrl: "http://localhost:3010/security/dados?url=https://api.github.com/users/github",
    description:
      "Endpoint SSRF com validacao de protocolo e host por allowlist.",
    defaultBody: null
  },
  {
    id: "not-security-dados",
    method: "GET",
    path: "/not-security/dados?url=...",
    defaultUrl: "http://localhost:3010/not-security/dados?url=https://example.com",
    description:
      "Endpoint sem protecao forte para fetch remoto do parametro url.",
    defaultBody: null
  }
];

const routesContainer = document.querySelector("#routesContainer");
const template = document.querySelector("#routeCardTemplate");
const globalToken = document.querySelector("#globalToken");

routes.forEach((route, index) => {
  const fragment = template.content.cloneNode(true);
  const card = fragment.querySelector(".route-card");
  const toggleBtn = fragment.querySelector(".route-toggle");
  const routeContent = fragment.querySelector(".route-content");
  const methodTag = fragment.querySelector(".method-tag");
  const title = fragment.querySelector(".route-title");
  const descriptionText = fragment.querySelector(".description-text");
  const urlInput = fragment.querySelector(".url-input");
  const bodyField = fragment.querySelector(".body-field");
  const bodyInput = fragment.querySelector(".body-input");
  const runBtn = fragment.querySelector(".run-btn");
  const output = fragment.querySelector(".response-output");
  const meta = fragment.querySelector(".meta");

  card.style.animationDelay = `${index * 60}ms`;
  methodTag.textContent = route.method;
  methodTag.classList.add(route.method.toLowerCase());
  title.textContent = route.path;
  descriptionText.textContent = route.description;
  urlInput.value = route.defaultUrl;

  toggleBtn.addEventListener("click", () => {
    const isCollapsed = card.classList.toggle("is-collapsed");
    routeContent.classList.toggle("hidden", isCollapsed);
    toggleBtn.setAttribute("aria-expanded", String(!isCollapsed));
  });

  if (route.defaultBody) {
    bodyField.classList.remove("hidden");
    bodyInput.value = JSON.stringify(route.defaultBody, null, 2);
  }

  runBtn.addEventListener("click", async () => {
    output.textContent = "Executando requisicao...";
    meta.textContent = "";

    const headers = {
      Accept: "application/json"
    };

    const token = globalToken.value.trim();
    if (token) {
      headers.Authorization = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;
    }

    const options = {
      method: route.method,
      headers
    };

    if (route.method !== "GET" && bodyInput.value.trim()) {
      headers["Content-Type"] = "application/json";
      options.body = bodyInput.value;
    }

    const startedAt = performance.now();

    try {
      const response = await fetch(urlInput.value, options);
      const endedAt = performance.now();
      const tookMs = Math.round(endedAt - startedAt);

      const rawBody = await response.text();
      const contentType = response.headers.get("content-type") || "";
      const responseHeaders = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      let parsedBody = rawBody;
      if (contentType.includes("application/json")) {
        try {
          parsedBody = JSON.parse(rawBody);
        } catch {
          parsedBody = rawBody;
        }
      }

      const payload = {
        url: urlInput.value,
        method: route.method,
        status: response.status,
        ok: response.ok,
        timeMs: tookMs,
        description: route.description,
        responseHeaders,
        body: parsedBody
      };

      output.textContent = JSON.stringify(payload, null, 2);
      meta.textContent = `${response.status} em ${tookMs} ms`;
      meta.className = `meta ${response.ok ? "ok" : "warn"}`;
    } catch (error) {
      meta.textContent = "falha de rede/cors";
      meta.className = "meta warn";
      output.textContent = JSON.stringify(
        {
          url: urlInput.value,
          method: route.method,
          description: route.description,
          error: String(error)
        },
        null,
        2
      );
    }
  });

  routesContainer.append(fragment);
});
