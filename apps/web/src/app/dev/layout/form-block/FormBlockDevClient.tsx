"use client";

import { useMemo, useState } from "react";
import type { SectionBlock } from "@pb/contracts";
import {
  BooleanField,
  Field,
  SectionPreview,
  SectionWorkbenchLayout,
  controlClassName,
} from "@/app/dev/layout/_shared/section-type-workbench";

type FieldPreset = "contact" | "choice" | "complete";

const FIELD_PRESETS: FieldPreset[] = ["contact", "choice", "complete"];

const CONTACT_FIELDS = [
  {
    type: "formField",
    fieldType: "text",
    name: "name",
    label: "Name",
    placeholder: "Jane Designer",
    required: true,
    level: 3,
  },
  {
    type: "formField",
    fieldType: "email",
    name: "email",
    label: "Email",
    placeholder: "jane@example.com",
    required: true,
    level: 3,
  },
  {
    type: "formField",
    fieldType: "paragraph",
    name: "message",
    label: "Message",
    placeholder: "What should we build?",
    rows: 4,
    level: 3,
  },
  { type: "formField", fieldType: "submit", label: "Send", loadingText: "Sending..." },
] as const;

const CHOICE_FIELDS = [
  {
    type: "formField",
    fieldType: "select",
    name: "scope",
    label: "Scope",
    options: [
      { value: "site", label: "Site" },
      { value: "system", label: "Design system" },
      { value: "prototype", label: "Prototype" },
    ],
    level: 3,
  },
  {
    type: "formField",
    fieldType: "radio",
    name: "timeline",
    label: "Timeline",
    options: [
      { value: "now", label: "Now" },
      { value: "soon", label: "Soon" },
    ],
    level: 3,
  },
  { type: "formField", fieldType: "switch", name: "updates", label: "Send updates", level: 3 },
  { type: "formField", fieldType: "submit", label: "Continue" },
] as const;

function buildFields(preset: FieldPreset) {
  if (preset === "contact") return [...CONTACT_FIELDS];
  if (preset === "choice") return [...CHOICE_FIELDS];
  return [
    ...CONTACT_FIELDS.slice(0, 2),
    {
      type: "formField",
      fieldType: "range",
      name: "budget",
      label: "Budget comfort",
      min: 0,
      max: 100,
      step: 5,
      level: 3,
    },
    ...CHOICE_FIELDS.slice(0, 2),
    { type: "formField", fieldType: "checkbox", name: "agree", label: "I agree", level: 3 },
    { type: "formField", fieldType: "submit", label: "Submit" },
  ];
}

function buildSection(
  preset: FieldPreset,
  action: string,
  method: "get" | "post",
  fill: string,
  compact: boolean
): SectionBlock {
  return {
    type: "formBlock",
    id: "form_block_workbench",
    ariaLabel: "Form block workbench",
    width: "100%",
    height: "hug",
    align: "center",
    fill,
    borderRadius: "0.5rem",
    border: { color: "rgba(255,255,255,0.18)", width: "1px", style: "solid" },
    marginTop: "1rem",
    marginBottom: "1rem",
    contentWidth: compact ? "hug" : "full",
    action,
    method,
    fields: buildFields(preset),
  } as SectionBlock;
}

export function FormBlockDevClient() {
  const [preset, setPreset] = useState<FieldPreset>("contact");
  const [action, setAction] = useState("");
  const [method, setMethod] = useState<"get" | "post">("post");
  const [fill, setFill] = useState("rgba(17, 24, 39, 0.82)");
  const [compact, setCompact] = useState(false);
  const section = useMemo(
    () => buildSection(preset, action, method, fill, compact),
    [preset, action, method, fill, compact]
  );

  return (
    <SectionWorkbenchLayout
      eyebrow="Dev · Layout"
      title="Form Block"
      description="Render production form fields inside a formBlock section while editing section-level props."
      affects="formBlock fields, action/method metadata, content sizing, fill, border, and form section layout"
      section={section}
      onReset={() => {
        setPreset("contact");
        setAction("");
        setMethod("post");
        setFill("rgba(17, 24, 39, 0.82)");
        setCompact(false);
      }}
      preview={<SectionPreview section={section} />}
      controls={
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Field preset">
            <select
              value={preset}
              onChange={(event) => setPreset(event.target.value as FieldPreset)}
              className={controlClassName()}
            >
              {FIELD_PRESETS.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Method">
            <select
              value={method}
              onChange={(event) => setMethod(event.target.value as "get" | "post")}
              className={controlClassName()}
            >
              <option value="post">post</option>
              <option value="get">get</option>
            </select>
          </Field>
          <Field label="Action key">
            <input
              value={action}
              onChange={(event) => setAction(event.target.value)}
              className={controlClassName()}
            />
          </Field>
          <Field label="Fill">
            <input
              value={fill}
              onChange={(event) => setFill(event.target.value)}
              className={controlClassName()}
            />
          </Field>
          <BooleanField label="Compact content" checked={compact} onChange={setCompact} />
        </div>
      }
    />
  );
}
