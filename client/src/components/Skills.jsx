import { motion } from 'framer-motion';
import { FaChartBar, FaBrain, FaCogs, FaDesktop } from 'react-icons/fa';
import {
  SiFigma,
  SiGit,
  SiJavascript,
  SiJupyter,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiVisualstudiocode
} from 'react-icons/si';
import { skillCategories } from '../data/skills';

const skillIcons = {
  Python: SiPython,
  SQL: SiPostgresql,
  JavaScript: SiJavascript,
  'Scikit-learn': SiPython,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  'Data Analysis': FaChartBar,
  EDA: FaChartBar,
  'Model Training': FaBrain,
  'Feature Engineering': FaCogs,
  React: SiReact,
  Tailwind: SiTailwindcss,
  'Responsive UI': FaDesktop,
  Git: SiGit,
  'VS Code': SiVisualstudiocode,
  Jupyter: SiJupyter,
  Figma: SiFigma
};

function Skills() {
  return (
    <section id="skills" className="section-container">
      <div className="mb-12">
        <span className="section-heading">Skills</span>
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Technical skills shaped for insight-driven products.</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {skillCategories.map((category) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="card-panel rounded-[2rem] p-8"
          >
            <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {category.items.map((skill) => {
                const Icon = skillIcons[skill.name] ?? FaChartBar;
                return (
                  <div key={skill.name} className="flex items-center gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 px-4 py-4">
                    <Icon className="h-8 w-8 text-brand" />
                    <span className="text-lg font-medium text-white">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
