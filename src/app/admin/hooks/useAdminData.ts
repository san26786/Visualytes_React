"use client";

import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  FormEvent,
} from "react";

import {
  Client,
  ClientForm,
  ContactPageContent,
  FAQ,
  FAQForm,
  FormDefinition,
  ManagedPackage,
  Portfolio,
  ProcessSection,
  ProcessStep,
  ProcessStepForm,
  ProcessSectionForm,
  Purchase,
  SocialLink,
  Submission,
  User,
  CaseStudyForm,
  CaseStudy,
  Testimonial,
  TestimonialForm,
} from "../../admin-dashboard/types/dashboard";

import { useToast } from "../../admin-dashboard/components/UI/Toast";

const BLANK_USER = {
  name: "",
  email: "",
  password: "",
};

const BLANK_FAQ: FAQForm = {
  question: "",
  answer: "",
  sortOrder: 0,
  isActive: true,
};
const BLANK_TESTIMONIAL: TestimonialForm = {
  image: "/assets/png/no-image.png",
  name: "",
  designation: "",
  company: "",
  review: "",
  sortOrder: 0,
  isActive: true,
};

export function useAdminData() {
  const { showToast } = useToast();

  const [message, setMessage] = useState("");

  // =========================================================
  // DATA STATES
  // =========================================================

  const [users, setUsers] = useState<User[]>([]);
  const [forms, setForms] = useState<FormDefinition[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [packages, setPackages] = useState<ManagedPackage[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
const [clients, setClients] = useState<Client[]>([]);
const [clientsLoading, setClientsLoading] = useState(false);
const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
const [caseStudiesLoading, setCaseStudiesLoading] = useState(false);
const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
const [testimonialsLoading, setTestimonialsLoading] = useState(false);
  // =========================================================
  // USER FORM
  // =========================================================

  const [userForm, setUserForm] = useState(BLANK_USER);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // =========================================================
  // SOCIAL FORM
  // =========================================================

  const [socialForm, setSocialForm] = useState({
    platform: "",
    url: "",
    isActive: true,
    sortOrder: 0,
  });

  // =========================================================
  // PORTFOLIO FORM
  // =========================================================

  const [portfolioForm, setPortfolioForm] = useState({
    title: "",
    category: "WEB DESIGN",
    image: "",
  });

  const [editingPortfolio, setEditingPortfolio] =
    useState<Portfolio | null>(null);

const loadClients = useCallback(async () => {
  try {
    setClientsLoading(true);

    const response = await fetch("/api/admin/clients");

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch clients.");
    }

    setClients(result);
  } catch (error) {
    console.error("loadClients error:", error);

    showToast(
      error instanceof Error
        ? error.message
        : "Failed to load clients.",
      "error"
    );
  } finally {
    setClientsLoading(false);
  }
}, [showToast]);






const createClient = useCallback(
  async (data: ClientForm) => {
    try {
      const response = await fetch("/api/admin/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to create client."
        );
      }

      setClients((prev) => [result, ...prev]);

      showToast("Client created successfully.", "success");

      return result;
    } catch (error) {
      console.error("createClient error:", error);

      showToast(
        error instanceof Error
          ? error.message
          : "Failed to create client.",
        "error"
      );

      throw error;
    }
  },
  [showToast]
);

const updateClient = useCallback(
  async (id: string, data: ClientForm) => {
    try {
      const response = await fetch(
        `/api/admin/clients/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to update client."
        );
      }

      setClients((prev) =>
        prev.map((client) =>
          client.id === id ? result : client
        )
      );

      showToast("Client updated successfully.", "success");

      return result;
    } catch (error) {
      console.error("updateClient error:", error);

      showToast(
        error instanceof Error
          ? error.message
          : "Failed to update client.",
        "error"
      );

      throw error;
    }
  },
  [showToast]
);

const deleteClient = useCallback(
  async (id: string) => {
    try {
      const response = await fetch(
        `/api/admin/clients/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to delete client."
        );
      }

      setClients((prev) =>
        prev.filter((client) => client.id !== id)
      );

      showToast("Client deleted successfully.", "success");
    } catch (error) {
      console.error("deleteClient error:", error);

      showToast(
        error instanceof Error
          ? error.message
          : "Failed to delete client.",
        "error"
      );

      throw error;
    }
  },
  [showToast]
);

const uploadClientImage = useCallback(
  async (file: File) => {
    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "/api/admin/upload-client",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to upload image."
        );
      }

      return result.image as string;
    } catch (error) {
      console.error("uploadClientImage error:", error);

      showToast(
        error instanceof Error
          ? error.message
          : "Failed to upload client image.",
        "error"
      );

      throw error;
    }
  },
  [showToast]
);
const [process, setProcess] =
  useState<ProcessSection | null>(null);

const [processLoading] =
  useState(false);
  // =========================================================
  // CONTACT PAGE
  // =========================================================

  const [contactPage, setContactPage] =
    useState<ContactPageContent | null>(null);

  const [originalContactPage, setOriginalContactPage] =
    useState<ContactPageContent | null>(null);

  const [savingContact, setSavingContact] = useState(false);

  // =========================================================
  // FAQ FORM
  // =========================================================

  const [faqForm, setFaqForm] = useState<FAQForm>(BLANK_FAQ);

  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);

  // =========================================================
  // REQUEST HELPER
  // =========================================================
const request = useCallback(
  async (url: string, options?: RequestInit) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...(options?.body instanceof FormData
          ? {}
          : {
              "Content-Type": "application/json",
            }),
        ...options?.headers,
      },
    });

    const text = await response.text();

    let data: any = null;

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = {
          message: text,
        };
      }
    }

    if (!response.ok) {
      throw new Error(
        data?.message ||
          `Request failed with status ${response.status}.`
      );
    }

    return data;
  },
  []
);
const loadTestimonials = useCallback(async () => {
  setTestimonialsLoading(true);

  try {
    const data = await request(
      "/api/admin/testimonials"
    );

    setTestimonials(
      Array.isArray(data) ? data : []
    );
  } catch (error) {
    console.error(
      "Failed to load testimonials:",
      error
    );

    setTestimonials([]);
  } finally {
    setTestimonialsLoading(false);
  }
}, [request]);
const createTestimonial = useCallback(
  async (form: TestimonialForm) => {
    try {
      await request(
        "/api/admin/testimonials",
        {
          method: "POST",
          body: JSON.stringify(form),
        }
      );

      await loadTestimonials();

      setMessage(
        "Testimonial created successfully."
      );
    } catch (error) {
      console.error(
        "Failed to create testimonial:",
        error
      );

      throw error;
    }
  },
  [request, loadTestimonials]
);
const updateTestimonial = useCallback(
  async (
    id: string,
    form: TestimonialForm
  ) => {
    try {
      await request(
        `/api/admin/testimonials/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(form),
        }
      );

      await loadTestimonials();

      setMessage(
        "Testimonial updated successfully."
      );
    } catch (error) {
      console.error(
        "Failed to update testimonial:",
        error
      );

      throw error;
    }
  },
  [request, loadTestimonials]
);
const deleteTestimonial = useCallback(
  async (id: string) => {
    try {
      await request(
        `/api/admin/testimonials/${id}`,
        {
          method: "DELETE",
        }
      );

      await loadTestimonials();

      setMessage(
        "Testimonial deleted successfully."
      );
    } catch (error) {
      console.error(
        "Failed to delete testimonial:",
        error
      );

      throw error;
    }
  },
  [request, loadTestimonials]
);
const toggleTestimonial = useCallback(
  async (testimonial: Testimonial) => {
    try {
      await request(
        `/api/admin/testimonials/${testimonial.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            image: testimonial.image,
            name: testimonial.name,
            designation: testimonial.designation,
            company: testimonial.company ?? "",
            review: testimonial.review,
            sortOrder: testimonial.sortOrder,
            isActive: !testimonial.isActive,
          }),
        }
      );

      await loadTestimonials();

      setMessage(
        `Testimonial ${
          testimonial.isActive
            ? "deactivated"
            : "activated"
        } successfully.`
      );
    } catch (error) {
      console.error(
        "Failed to toggle testimonial:",
        error
      );

      throw error;
    }
  },
  [request, loadTestimonials]
);
  // =========================================================
  // ERROR HANDLER
  // =========================================================

  const showError = useCallback(
    (error: unknown) => {
      const msg =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";

      setMessage(msg);
      showToast(msg, "error");
    },
    [showToast]
  );

  // =========================================================
  // LOADERS
  // =========================================================
const loadProcess = useCallback(async () => {
  try {
    const data = await request("/api/admin/process");

    setProcess({
      ...data,
      steps: data.steps.map((step: any) => ({
        ...step,
        description: step.description ?? step.text ?? "",
      })),
    });
  } catch (error) {
    showError(error);
  }
}, [request, showError]);

  const loadUsers = useCallback(() => {
    request("/api/admin/users")
      .then(setUsers)
      .catch(showError);
  }, [request, showError]);

  const loadForms = useCallback(() => {
    request("/api/admin/forms")
      .then((d) => {
        setForms(d.forms);
        setSubmissions(d.submissions);
      })
      .catch(showError);
  }, [request, showError]);

  const loadPackages = useCallback(() => {
    request("/api/admin/packages")
      .then((d) => {
        setPackages(d.packages);
        setPurchases(d.purchases);
      })
      .catch(showError);
  }, [request, showError]);

  const loadSocial = useCallback(() => {
    request("/api/admin/social-links")
      .then(setSocialLinks)
      .catch(showError);
  }, [request, showError]);

  const loadPortfolio = useCallback(() => {
    request("/api/admin/portfolio")
      .then(setPortfolio)
      .catch(showError);
  }, [request, showError]);

  const loadContactPage = useCallback(() => {
    request("/api/admin/contact-page")
      .then((d) => {
        setContactPage(d);
        setOriginalContactPage(d);
      })
      .catch(showError);
  }, [request, showError]);

  // =========================================================
  // FAQ LOADER
  // IMPORTANT: MUST BE BEFORE useEffect
  // =========================================================

  const loadFAQs = useCallback(async () => {
    try {
      const data = await request("/api/admin/faqs");

      setFaqs(data);
    } catch (error) {
      showError(error);
    }
  }, [request, showError]);
const loadCaseStudies = useCallback(async () => {
  setCaseStudiesLoading(true);

  try {
    const response = await fetch("/api/admin/case-studies", {
      method: "GET",
      cache: "no-store",
    });

    const result = await response.json();

  

    setCaseStudies(Array.isArray(result) ? result : result.caseStudies ?? []);
  } catch (error) {
    console.error("Failed to load case studies:", error);
    setCaseStudies([]);
  } finally {
    setCaseStudiesLoading(false);
  }
}, []);

  // =========================================================
  // LOAD ALL DATA
  // =========================================================

  useEffect(() => {
    // Deferred one tick so the initial fetches never set state synchronously inside the effect.
    const timer = setTimeout(() => {
    loadUsers();
    loadForms();
    loadPackages();
    loadSocial();
    loadPortfolio();
    loadContactPage();
    loadFAQs();
    loadClients();
    loadProcess();
    loadCaseStudies();
    loadTestimonials();
    }, 0);
    return () => clearTimeout(timer);
  }, [
    loadUsers,
    loadForms,
    loadPackages,
    loadSocial,
    loadPortfolio,
    loadContactPage,
    loadFAQs,
    loadClients,
    loadProcess,
    loadCaseStudies,
    loadTestimonials,
  ]);

  // =========================================================
  // METRICS
  // =========================================================

  const metrics = useMemo(
    () => [
      {
        label: "Total Users",
        value: users.length,
        change: "+12%",
      },
      {
        label: "Submissions",
        value: submissions.length,
        change: "+8%",
      },
      {
        label: "Active Packages",
        value: packages.filter((i) => i.isActive).length,
        change: "Stable",
      },
      {
        label: "Total Purchases",
        value: purchases.length,
        change: "+24%",
      },
    ],
    [users, submissions, packages, purchases]
  );
const saveProcessSection = useCallback(
  async (
    id: string,
    data: ProcessSectionForm
  ) => {
    return await request("/api/admin/process", {
      method: "PATCH",
      body: JSON.stringify({
        id,
        title: data.title,
        subtitle: data.subtitle,
        backgroundColor: data.backgroundColor,
        isActive: data.isActive,
      }),
    });
  },
  [request]
);

const createProcessStep = useCallback(
  async (data: ProcessStepForm) => {
    try {
      if (!process?.id) {
        throw new Error("Process section not found.");
      }

     const result = await request(
  "/api/admin/process/steps",
  {
    method: "POST",
    body: JSON.stringify({
      processId: process.id,
      title: data.title,
      description: data.description,
      image: data.image,
      color: data.color,
      sortOrder: data.sortOrder,
      isActive: data.isActive,
    }),
  }
);

      await loadProcess();

      showToast(
        "Process step created successfully.",
        "success"
      );

      return result;
    } catch (error) {
      showError(error);
      throw error;
    }
  },
  [
    process,
    request,
    loadProcess,
    showToast,
    showError,
  ]
);

// const createProcessStep = useCallback(
//   async (data: ProcessStepForm) => {
//     try {
//       const result = await request(
//         "/api/admin/process/steps",
//         {
//           method: "POST",
//           body: JSON.stringify(data),
//         }
//       );

//       await loadProcess();

//       showToast(
//         "Process step created successfully.",
//         "success"
//       );

//       return result;
//     } catch (error) {
//       showError(error);
//       throw error;
//     }
//   },
//   [request, loadProcess, showError, showToast]
// );
const deleteProcessStep = useCallback(
  async (id: string) => {
    try {
      await request(
        `/api/admin/process/steps/${id}`,
        {
          method: "DELETE",
        }
      );

      await loadProcess();

      showToast(
        "Process step deleted successfully.",
        "success"
      );
    } catch (error) {
      showError(error);
      throw error;
    }
  },
  [request, loadProcess, showError, showToast]
);
const updateProcessStep = useCallback(
  async (
    id: string,
    data: ProcessStepForm
  ) => {
    try {
      const result = await request(
        `/api/admin/process/steps/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
        }
      );

      await loadProcess();

      showToast(
        "Process step updated successfully.",
        "success"
      );

      return result;
    } catch (error) {
      showError(error);
      throw error;
    }
  },
  [request, loadProcess, showError, showToast]
);
const toggleProcessStep = useCallback(
  async (step: ProcessStep) => {
    try {
      await request(
        `/api/admin/process/steps/${step.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            title: step.title,
            description: step.description,
            image: step.image,
            color: step.color,
            sortOrder: step.sortOrder,
            isActive: !step.isActive,
          }),
        }
      );

      await loadProcess();

      showToast(
        `Process step ${
          step.isActive ? "disabled" : "enabled"
        }.`,
        "success"
      );
    } catch (error) {
      showError(error);
      throw error;
    }
  },
  [request, loadProcess, showError, showToast]
);
const moveProcessStep = useCallback(
  async (
    id: string,
    direction: "up" | "down"
  ) => {
    if (!process?.steps) return;

    const steps = [...process.steps].sort(
      (a, b) => a.sortOrder - b.sortOrder
    );

    const index = steps.findIndex(
      (step) => step.id === id
    );

    if (index === -1) return;

    const targetIndex =
      direction === "up"
        ? index - 1
        : index + 1;

    if (
      targetIndex < 0 ||
      targetIndex >= steps.length
    ) {
      return;
    }

    const current = steps[index];
    const target = steps[targetIndex];

    try {
      await Promise.all([
        request(
          `/api/admin/process/steps/${current.id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              title: current.title,
              description: current.description,
              image: current.image,
              color: current.color,
              sortOrder: target.sortOrder,
              isActive: current.isActive,
            }),
          }
        ),

        request(
          `/api/admin/process/steps/${target.id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              title: target.title,
              description: target.description,
              image: target.image,
              color: target.color,
              sortOrder: current.sortOrder,
              isActive: target.isActive,
            }),
          }
        ),
      ]);

      await loadProcess();

      showToast(
        "Process order updated.",
        "success"
      );
    } catch (error) {
      showError(error);
      throw error;
    }
  },
  [process, request, loadProcess, showError, showToast]
);
  // =========================================================
  // USER SAVE
  // =========================================================

  const saveUser = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (editingUser) {
        await request(`/api/admin/users/${editingUser.id}`, {
          method: "PATCH",
          body: JSON.stringify(userForm),
        });

        setMessage("User updated successfully.");
      } else {
        await request("/api/admin/users", {
          method: "POST",
          body: JSON.stringify(userForm),
        });

        setMessage("User created successfully.");
      }

      setEditingUser(null);
      setUserForm(BLANK_USER);

      loadUsers();
    } catch (err) {
      showError(err);
    }
  };

  // =========================================================
  // CONTACT PAGE
  // =========================================================

  const isContactPageDirty =
    contactPage && originalContactPage
      ? JSON.stringify(contactPage) !==
        JSON.stringify(originalContactPage)
      : false;

  const saveContactPage = async (e: FormEvent) => {
    e.preventDefault();

    if (!contactPage || !isContactPageDirty) return;

    setSavingContact(true);

    try {
      const updated = await request(
        "/api/admin/contact-page",
        {
          method: "PATCH",
          body: JSON.stringify(contactPage),
        }
      );

      setContactPage(updated);
      setOriginalContactPage(updated);

      showToast("Contact page updated.", "success");
    } catch (err) {
      showError(err);
    } finally {
      setSavingContact(false);
    }
  };

  // =========================================================
  // FAQ SAVE
  // IMPORTANT: THIS MUST BE INSIDE THE HOOK
  // =========================================================

  const saveFAQ = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const wasEditing = Boolean(editingFAQ);

      const endpoint = editingFAQ
        ? `/api/admin/faqs/${editingFAQ.id}`
        : "/api/admin/faqs";

      const method = editingFAQ ? "PUT" : "POST";

      await request(endpoint, {
        method,
        body: JSON.stringify(faqForm),
      });

      setFaqForm(BLANK_FAQ);
      setEditingFAQ(null);

      await loadFAQs();

      setMessage(
        wasEditing
          ? "FAQ updated successfully."
          : "FAQ created successfully."
      );
    } catch (error) {
      showError(error);
    }
  };

const createCaseStudy = useCallback(
  async (form: CaseStudyForm) => {
    try {
      const response = await fetch("/api/admin/case-studies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title.trim(),
          category: form.category.trim(),
          image: form.image.trim(),
          href: form.href.trim(),
          accent: form.accent.trim(),
          tag: form.tag.trim(),
          description: form.description.trim(),
          sortOrder: Number(form.sortOrder) || 0,
          isActive: form.isActive,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error || "Failed to create case study."
        );
      }

      await loadCaseStudies();

      setMessage("Case study created successfully.");

      return result;
    } catch (error) {
      console.error("Failed to create case study:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to create case study."
      );

      throw error;
    }
  },
  [loadCaseStudies, setMessage]
);
const updateCaseStudy = useCallback(
  async (id: string, form: CaseStudyForm) => {
    try {
      const response = await fetch(`/api/admin/case-studies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title.trim(),
          category: form.category.trim(),
          image: form.image.trim(),
          href: form.href.trim(),
          accent: form.accent.trim(),
          tag: form.tag.trim(),
          description: form.description.trim(),
          sortOrder: Number(form.sortOrder) || 0,
          isActive: form.isActive,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error || "Failed to update case study."
        );
      }

      await loadCaseStudies();

      setMessage("Case study updated successfully.");

      return result;
    } catch (error) {
      console.error("Failed to update case study:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to update case study."
      );

      throw error;
    }
  },
  [loadCaseStudies, setMessage]
);
const deleteCaseStudy = useCallback(
  async (id: string) => {
    try {
      const response = await fetch(`/api/admin/case-studies/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error || "Failed to delete case study."
        );
      }

      setCaseStudies((current) =>
        current.filter((item) => item.id !== id)
      );

      setMessage("Case study deleted successfully.");

      return result;
    } catch (error) {
      console.error("Failed to delete case study:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to delete case study."
      );

      throw error;
    }
  },
  [setMessage]
);
const toggleCaseStudy = useCallback(
  async (caseStudy: CaseStudy) => {
    try {
      const response = await fetch(
        `/api/admin/case-studies/${caseStudy.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: caseStudy.title,
            category: caseStudy.category,
            image: caseStudy.image ?? "",
            href: caseStudy.href ?? "",
            accent: caseStudy.accent ?? "",
            tag: caseStudy.tag ?? "",
            description: caseStudy.description ?? "",
            sortOrder: caseStudy.sortOrder,
            isActive: !caseStudy.isActive,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error || "Failed to change case study status."
        );
      }

      setCaseStudies((current) =>
        current.map((item) =>
          item.id === caseStudy.id
            ? {
                ...item,
                isActive: !item.isActive,
              }
            : item
        )
      );

      setMessage(
        !caseStudy.isActive
          ? "Case study activated."
          : "Case study deactivated."
      );

      return result;
    } catch (error) {
      console.error(
        "Failed to toggle case study:",
        error
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to change case study status."
      );

      throw error;
    }
  },
  [setMessage]
);
const uploadCaseStudyImage = useCallback(
  async (file: File) => {
    try {
      if (!file) {
        throw new Error("Please select an image.");
      }

      if (!file.type.startsWith("image/")) {
        throw new Error("Only image files are allowed.");
      }

      const maxSize = 10 * 1024 * 1024;

      if (file.size > maxSize) {
        throw new Error("Image size must be less than 10MB.");
      }

      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "/api/admin/upload-case-study",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error || "Failed to upload case study image."
        );
      }

      setMessage("Case study image uploaded successfully.");

      return result;
    } catch (error) {
      console.error(
        "Failed to upload case study image:",
        error
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to upload case study image."
      );

      throw error;
    }
  },
  [setMessage]
);
const moveCaseStudy = useCallback(
  async (
    id: string,
    direction: "up" | "down"
  ) => {
    try {
      const sorted = [...caseStudies].sort(
        (a, b) => a.sortOrder - b.sortOrder
      );

      const index = sorted.findIndex(
        (item) => item.id === id
      );

      if (index === -1) {
        return;
      }

      const targetIndex =
        direction === "up"
          ? index - 1
          : index + 1;

      if (
        targetIndex < 0 ||
        targetIndex >= sorted.length
      ) {
        return;
      }

      const current = sorted[index];
      const target = sorted[targetIndex];

      const response = await fetch(
        `/api/admin/case-studies/${current.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: current.title,
            category: current.category,
            image: current.image ?? "",
            href: current.href ?? "",
            accent: current.accent ?? "",
            tag: current.tag ?? "",
            description: current.description ?? "",
            sortOrder: target.sortOrder,
            isActive: current.isActive,
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();

        throw new Error(
          result?.error || "Failed to move case study."
        );
      }

      const secondResponse = await fetch(
        `/api/admin/case-studies/${target.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: target.title,
            category: target.category,
            image: target.image ?? "",
            href: target.href ?? "",
            accent: target.accent ?? "",
            tag: target.tag ?? "",
            description: target.description ?? "",
            sortOrder: current.sortOrder,
            isActive: target.isActive,
          }),
        }
      );

      if (!secondResponse.ok) {
        const result = await secondResponse.json();

        throw new Error(
          result?.error ||
            "Failed to update the other case study."
        );
      }

      await loadCaseStudies();

      setMessage("Case study order updated.");
    } catch (error) {
      console.error(
        "Failed to move case study:",
        error
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to move case study."
      );

      throw error;
    }
  },
  [caseStudies, loadCaseStudies, setMessage]
);

  return {
    // Request / message
    request,
    message,
    setMessage,
 clients,
  clientsLoading,
  loadClients,
  createClient,
  updateClient,
  deleteClient,
  uploadClientImage,
    // Metrics
    metrics,

    // Users
    users,
    userForm,
    setUserForm,
    editingUser,
    setEditingUser,
    saveUser,
    loadUsers,
    BLANK_USER,

    // Forms
    forms,
    submissions,
    loadForms,

    // Packages
    packages,
    purchases,
    loadPackages,

    // Social
    socialLinks,
    socialForm,
    setSocialForm,
    loadSocial,

    // Portfolio
    portfolio,
    portfolioForm,
    setPortfolioForm,
    editingPortfolio,
    setEditingPortfolio,
    loadPortfolio,

    // Contact
    contactPage,
    setContactPage,
    isContactPageDirty,
    saveContactPage,
    savingContact,

    // FAQ
    faqs,
    faqForm,
    setFaqForm,
    editingFAQ,
    setEditingFAQ,
    saveFAQ,
    loadFAQs,

    // Process
process,
processLoading,
loadProcess,
saveProcessSection,
createProcessStep,
updateProcessStep,
deleteProcessStep,
toggleProcessStep,
moveProcessStep,

 caseStudies,
  caseStudiesLoading,
  loadCaseStudies,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
  toggleCaseStudy,
  uploadCaseStudyImage,
  moveCaseStudy,
  testimonials,
  testimonialsLoading,
  BLANK_TESTIMONIAL,
  loadTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonial,

  };
}