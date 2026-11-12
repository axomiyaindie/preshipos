"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Blocks,
  BookOpen,
  Bot,
  Check,
  ChevronDown,
  CircleHelp,
  Compass,
  FolderKanban,
  Gauge,
  Globe2,
  Layers3,
  Lightbulb,
  Menu,
  MessageSquare,
  Plus,
  Rocket,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";

const navigation = [
  {
    label: "WORKSPACE",
    items: [
      { name: "Overview", icon: Gauge },
      { name: "Projects", icon: FolderKanban },
    ],
  },
  {
    label: "PRODUCT LIFECYCLE",
    items: [
      { name: "Validate", icon: Lightbulb },
      { name: "Build", icon: Blocks },
      { name: "Check", icon: ShieldCheck },
      { name: "Prepare", icon: Layers3 },
    ],
  },
  {
    label: "GO TO MARKET",
    items: [
      { name: "Launch", icon: Rocket },
      { name: "Distribute", icon: Globe2 },
      { name: "Discover", icon: Compass },
      { name: "Grow", icon: TrendingUp },
    ],
  },
];

type Project = {
  id: string;
  name: string;
};

function Brand() {
  return (
    <div className="flex items-center gap-3 px-5 py-6">
      <div className="flex size-9 items-center justify-center rounded-xl bg-[#7569f5] text-white shadow-lg shadow-indigo-950/20">
        <Zap size={19} fill="currentColor" strokeWidth={1.8} />
      </div>
      <div>
        <p className="text-[17px] font-bold tracking-tight text-white">
          PreShip<span className="text-[#9289ff]">OS</span>
        </p>
        <p className="text-[10px] font-medium tracking-[0.16em] text-slate-500">
          THE MAKER OPERATING SYSTEM
        </p>
      </div>
    </div>
  );
}

function Sidebar({
  active,
  setActive,
  mobileOpen,
  setMobileOpen,
}: {
  active: string;
  setActive: (value: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}) {
  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[258px] flex-col border-r border-[#292b39] bg-[#171923] transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Brand />
          <button
            onClick={() => setMobileOpen(false)}
            className="mr-4 rounded-lg p-2 text-slate-400 hover:bg-white/10 lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mx-4 mb-6 rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#343348] text-[#b8b2ff]">
              <Layers3 size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-white">
                My Workspace
              </p>
              <p className="text-[10px] text-slate-500">Personal workspace</p>
            </div>
            <ChevronDown size={15} className="text-slate-500" />
          </div>
        </div>

        <nav className="custom-scrollbar flex-1 space-y-7 overflow-y-auto px-3 pb-5">
          {navigation.map((group) => (
            <div key={group.label}>
              <p className="mb-2 px-3 text-[9px] font-bold tracking-[0.16em] text-slate-500">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const selected = active === item.name;

                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setActive(item.name);
                        setMobileOpen(false);
                        if (item.name !== "Overview") {
                          toast.info(`${item.name} workspace`, {
                            description:
                              "This module will be developed in an upcoming milestone.",
                          });
                        }
                      }}
                      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] font-medium transition-all ${
                        selected
                          ? "bg-[#34314f] text-white shadow-sm"
                          : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      <Icon
                        size={16}
                        className={
                          selected
                            ? "text-[#a69fff]"
                            : "text-slate-500 group-hover:text-slate-300"
                        }
                      />
                      <span className="flex-1">{item.name}</span>
                      {item.count && (
                        <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] text-slate-300">
                          {item.count}
                        </span>
                      )}
                      {selected && (
                        <span className="size-1.5 rounded-full bg-[#a69fff]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <button
            onClick={() => toast.info("Documentation is coming soon.")}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <BookOpen size={16} />
            Documentation
          </button>
          <button
            onClick={() => toast.info("Settings are coming soon.")}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <Settings2 size={16} />
            Settings
          </button>

          <div className="mt-3 flex items-center gap-3 rounded-xl bg-white/[0.05] p-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-[#dedaff] text-xs font-bold text-[#5146c9]">
              M
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-white">
                Maker
              </p>
              <p className="text-[10px] text-slate-500">Free workspace</p>
            </div>
            <ChevronDown size={14} className="text-slate-500" />
          </div>
        </div>
      </aside>
    </>
  );
}

function StatCard({
  label,
  value,
  description,
  icon: Icon,
  iconColor,
  trend,
}: {
  label: string;
  value: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  trend?: string;
}) {
  return (
    <div className="rounded-xl border border-[#e9eaf0] bg-white p-5 shadow-[0_2px_8px_rgba(20,20,40,0.025)]">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-[#777d8c]">{label}</p>
        <div className={`rounded-lg p-2 ${iconColor}`}>
          <Icon size={17} />
        </div>
      </div>
      <div className="mt-4 flex items-end gap-2">
        <p className="text-[28px] font-semibold tracking-tight text-[#171923]">
          {value}
        </p>
        {trend && (
          <span className="mb-1 flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600">
            <ArrowUpRight size={12} />
            {trend}
          </span>
        )}
      </div>
      <p className="mt-1 text-[11px] text-[#9297a5]">{description}</p>
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState("Overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("preshipos.projects.v1");

      if (stored) {
        const parsed: unknown = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setProjects(
            parsed.filter(
              (item): item is Project =>
                typeof item?.id === "string" &&
                typeof item?.name === "string"
            )
          );
        }
      }
    } catch {
      console.error("Unable to restore local projects.");
    } finally {
      setProjectsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!projectsLoaded) return;

    try {
      window.localStorage.setItem(
        "preshipos.projects.v1",
        JSON.stringify(projects)
      );
    } catch {
      console.error("Unable to save local projects.");
    }
  }, [projects, projectsLoaded]);
  const [newProject, setNewProject] = useState("");

  function createProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = newProject.trim();
    if (!name) return;

    setProjects((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name,
      },
    ]);

    setNewProject("");
    setShowCreate(false);
    toast.success("Project saved on this device", {
      description: name,
    });
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#171923]">
      <Sidebar
        active={active}
        setActive={setActive}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="min-h-screen lg:pl-[258px]">
        <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-[#e9eaf0] bg-white/90 px-4 backdrop-blur-xl sm:px-7 lg:px-9">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={20} />
            </button>
            <div>
              <p className="text-xs text-[#9297a5]">Workspace / Overview</p>
              <p className="text-sm font-semibold">Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => toast.info("Search is coming soon.")}
              className="hidden h-9 w-[190px] items-center gap-2 rounded-lg border border-[#e9eaf0] px-3 text-left text-xs text-[#9297a5] transition hover:border-[#c8c4f8] sm:flex"
            >
              <Search size={14} />
              <span className="flex-1">Search anything...</span>
              <kbd className="rounded border border-[#e9eaf0] px-1.5 py-0.5 text-[9px]">
                ⌘ K
              </kbd>
            </button>

            <button
              onClick={() => toast.info("You're all caught up!")}
              aria-label="Notifications"
              className="relative rounded-lg p-2 text-[#777d8c] transition hover:bg-[#f1f2f5]"
            >
              <Bell size={18} />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#ef7373] ring-2 ring-white" />
            </button>

            <div className="h-7 w-px bg-[#e9eaf0]" />

            <button
              onClick={() => toast.info("Account settings are coming soon.")}
              className="flex items-center gap-2"
            >
              <div className="flex size-8 items-center justify-center rounded-full bg-[#e8e5ff] text-xs font-bold text-[#5146c9]">
                M
              </div>
              <ChevronDown
                size={14}
                className="hidden text-[#9297a5] sm:block"
              />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] px-4 py-7 sm:px-7 sm:py-9 lg:px-9">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#9297a5]">
                    Your maker workspace
                  </p>
                </div>
                <h1 className="text-[25px] font-semibold tracking-tight text-[#171923] sm:text-[30px]">
                  Good to see you again.
                </h1>
                <p className="mt-1.5 text-sm text-[#858b99]">
                  Your products, progress, and next steps — all in one place.
                </p>
              </div>

              <button
                onClick={() => setShowCreate(true)}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#6257e8] px-4 text-xs font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-[#5146d5] active:scale-[0.98]"
              >
                <Plus size={16} />
                New project
              </button>
            </div>

            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Total projects"
                value={String(projects.length)}
                description="Products in your workspace"
                icon={FolderKanban}
                iconColor="bg-violet-50 text-violet-600"
              />
              <StatCard
                label="Lifecycle modules"
                value="8"
                description="From idea validation to growth"
                icon={Layers3}
                iconColor="bg-blue-50 text-blue-600"
              />
            </section>

            <section className="mt-8 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
              <div className="overflow-hidden rounded-xl border border-[#e9eaf0] bg-white">
                <div className="flex items-center justify-between border-b border-[#eff0f3] px-5 py-4 sm:px-6">
                  <div>
                    <h2 className="text-sm font-semibold">Your projects</h2>
                    <p className="mt-1 text-[11px] text-[#9297a5]">
                      Keep your products moving forward.
                    </p>
                  </div>
                  <button
                    onClick={() => toast.info("Project management view is coming soon.")}
                    className="flex items-center gap-1 text-[11px] font-semibold text-[#6257e8] hover:text-[#5146c9]"
                  >
                    View all <ArrowRight size={13} />
                  </button>
                </div>

                <div className="divide-y divide-[#eff0f3]">
                  {projects.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 px-5 py-4 transition hover:bg-[#fafaff] sm:px-6"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-sm font-bold text-violet-600">
                        {project.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-[#252837]">
                          {project.name}
                        </p>
                      </div>

                      <button
                        aria-label={`Remove ${project.name}`}
                        onClick={() =>
                          setProjects((current) =>
                            current.filter((item) => item.id !== project.id)
                          )
                        }
                        className="rounded-lg p-2 text-[#a0a4b0] hover:bg-red-50 hover:text-red-600"
                      >
                        <X size={15} />
                      </button>
                    </motion.div>
                  ))}
                </div>

                {projects.length === 0 && (
                  <div className="px-6 py-12 text-center">
                    <FolderKanban className="mx-auto mb-3 text-[#a0a4b0]" />
                    <p className="text-sm font-medium">No projects yet</p>
                    <p className="mt-1 text-xs text-[#9297a5]">
                      Create your first project to get started.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-5">
                <div className="relative overflow-hidden rounded-xl bg-[#222237] p-5 text-white sm:p-6">
                  <div className="absolute -right-12 -top-12 size-40 rounded-full border border-white/10" />
                  <div className="absolute -right-5 -top-5 size-28 rounded-full border border-white/10" />
                  <div className="relative">
                    <div className="mb-5 flex size-9 items-center justify-center rounded-xl bg-[#46406e] text-[#c1bbff]">
                      <Sparkles size={18} />
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#aaa4db]">
                      Your next milestone
                    </p>
                    <h2 className="mt-2 text-xl font-semibold leading-snug">
                      Turn your idea
                      <br />
                      into a launch-ready product.
                    </h2>
                    <p className="mt-2 max-w-[260px] text-[11px] leading-5 text-[#b1b1c5]">
                      Follow a structured journey from product validation to
                      launch and distribution.
                    </p>
                    <button
                      onClick={() =>
                        toast.info("Your product journey will be available soon.")
                      }
                      className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-2.5 text-[11px] font-semibold text-[#292642] transition hover:bg-[#efedff]"
                    >
                      Explore your journey <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-[#e9eaf0] bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold">
                        Launch checklist
                      </h2>
                      <p className="mt-1 text-[11px] text-[#9297a5]">
                        The essentials before going live.
                      </p>
                    </div>
                    <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                      <ShieldCheck size={17} />
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      { label: "Product idea validated", done: true },
                      { label: "Core features defined", done: true },
                      { label: "Landing page ready", done: false },
                      { label: "Launch channels selected", done: false },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-2.5"
                      >
                        <div
                          className={`flex size-[17px] items-center justify-center rounded-full ${
                            item.done
                              ? "bg-emerald-500 text-white"
                              : "border border-[#dfe1e8] text-transparent"
                          }`}
                        >
                          {item.done && <Check size={11} />}
                        </div>
                        <span
                          className={`text-[11px] ${
                            item.done
                              ? "text-[#555b6a]"
                              : "text-[#9297a5]"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-[#eff0f3] pt-4">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#9297a5]">Overall progress</span>
                      <span className="font-semibold text-[#6257e8]">50%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#eeeef3]">
                      <div className="h-full w-1/2 rounded-full bg-[#6257e8]" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-5 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
              <div className="rounded-xl border border-[#e9eaf0] bg-white p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold">Recent activity</h2>
                    <p className="mt-1 text-[11px] text-[#9297a5]">
                      The latest updates across your workspace.
                    </p>
                  </div>
                  <Activity size={17} className="text-[#a0a4b0]" />
                </div>

                <div className="mt-5 flex min-h-28 items-center justify-center rounded-lg bg-[#fafaff] px-4 py-6 text-center">
                  <p className="text-xs text-[#9297a5]">
                    No activity yet. Your workspace updates will appear here as you use PreShipOS.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[#e9eaf0] bg-white p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-[#f0efff] p-2 text-[#6257e8]">
                    <Bot size={17} />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold">Maker resources</h2>
                    <p className="text-[10px] text-[#9297a5]">
                      Tools to move faster.
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {[
                    {
                      icon: Lightbulb,
                      title: "Validate your idea",
                      subtitle: "Research before you build",
                    },
                    {
                      icon: Rocket,
                      title: "Plan your launch",
                      subtitle: "Find the right launch channels",
                    },
                    {
                      icon: MessageSquare,
                      title: "Maker community",
                      subtitle: "Learn and share with builders",
                    },
                  ].map((resource) => {
                    const Icon = resource.icon;
                    return (
                      <button
                        key={resource.title}
                        onClick={() =>
                          toast.info(`${resource.title} is coming soon.`)
                        }
                        className="flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition hover:bg-[#f7f7fc]"
                      >
                        <Icon size={16} className="text-[#7770dc]" />
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-semibold text-[#343847]">
                            {resource.title}
                          </p>
                          <p className="mt-0.5 text-[10px] text-[#9297a5]">
                            {resource.subtitle}
                          </p>
                        </div>
                        <ArrowUpRight
                          size={14}
                          className="text-[#a0a4b0]"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-[#e9eaf0] pt-5 text-[10px] text-[#a0a4b0] sm:flex-row">
              <p>© 2026 PreShipOS. Built for makers, by makers.</p>
              <p className="flex items-center gap-1">
                Build. Prepare. Launch. Distribute. Grow.
                <Sparkles size={11} />
              </p>
            </footer>
          </motion.div>
        </main>
      </div>

      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setShowCreate(false);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              className="w-full max-w-md rounded-2xl border border-[#e9eaf0] bg-white p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Create a project</h2>
                  <p className="mt-1 text-xs text-[#9297a5]">
                    Give your next product a home in PreShipOS.
                  </p>
                </div>
                <button
                  onClick={() => setShowCreate(false)}
                  aria-label="Close dialog"
                  className="rounded-lg p-2 text-[#9297a5] hover:bg-[#f1f2f5]"
                >
                  <X size={17} />
                </button>
              </div>

              <form onSubmit={createProject} className="mt-6">
                <label
                  htmlFor="project-name"
                  className="mb-2 block text-xs font-semibold"
                >
                  Project name
                </label>
                <input
                  id="project-name"
                  autoFocus
                  value={newProject}
                  onChange={(event) => setNewProject(event.target.value)}
                  placeholder="e.g. My next SaaS"
                  className="h-11 w-full rounded-lg border border-[#e3e4eb] px-3 text-sm outline-none transition placeholder:text-[#a0a4b0] focus:border-[#8178ed] focus:ring-2 focus:ring-[#8178ed]/15"
                  maxLength={60}
                  required
                />
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCreate(false)}
                    className="rounded-lg border border-[#e5e6ec] px-4 py-2.5 text-xs font-semibold text-[#626879] hover:bg-[#f7f8fa]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-[#6257e8] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#5146d5]"
                  >
                    Create project
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}