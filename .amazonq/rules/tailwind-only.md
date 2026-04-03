# Angular Styling: Tailwind-First

## Rule
Use Tailwind utility classes in Angular component templates (`.html`) as the **sole styling method** whenever possible. Component SCSS files (`.component.scss`) should remain empty or near-empty — only written when Tailwind genuinely cannot produce the required result.

---

## Always Do This — Tailwind in the Template

```html
<div class="flex items-center gap-4 rounded-lg bg-white p-6 shadow-md">
  <button class="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
    Save
  </button>
</div>
```

For dynamic/conditional classes, use Angular's `[class]` binding or `ngClass` with Tailwind utilities:

```html
<div [class]="isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'">...</div>

<li [ngClass]="{
  'font-semibold text-blue-700': isSelected,
  'text-gray-500 hover:text-gray-900': !isSelected
}">...</li>
```

---

## Only Resort to SCSS When Tailwind Cannot Do It

SCSS is permitted **only** for cases where Tailwind has no equivalent utility, including:

- **Deep/piercing selectors** for third-party or Angular Material component internals (`::ng-deep`)
- **Complex CSS animations** (`@keyframes`) that are too verbose to express inline
- **Arbitrary pseudo-selectors or combinators** not supported by Tailwind's variant system (e.g. `:nth-child` logic, sibling rules)
- **CSS custom property definitions** scoped to a component (`:host { --my-var: ... }`)
- **Browser-specific hacks** or highly unusual property values with no Tailwind utility

```scss
// ONLY write SCSS when there is no Tailwind alternative

:host {
  --recipe-card-height: 420px; /* scoped custom property */
}

::ng-deep .mat-mdc-form-field-subscript-wrapper {
  display: none; /* third-party override — no Tailwind equivalent */
}

@keyframes slide-in {
  from { transform: translateX(-100%); opacity: 0; }
  to   { transform: translateX(0);     opacity: 1; }
}
```

---

## Do Not Do This

```scss
/* ❌ Do not recreate what Tailwind already handles */
.card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

```html
<!-- ✅ Use Tailwind instead -->
<div class="flex items-center p-6 rounded-lg bg-white shadow">
```

---

## Summary

| Situation | Where to Style |
|---|---|
| Layout, spacing, color, typography, borders, shadows | Tailwind class in template |
| Hover, focus, active, disabled states | Tailwind variant in template (`hover:`, `focus:`, etc.) |
| Responsive breakpoints | Tailwind prefix in template (`sm:`, `md:`, etc.) |
| Dark mode | Tailwind prefix in template (`dark:`) |
| Third-party component overrides (`::ng-deep`) | SCSS only |
| `@keyframes` animations | SCSS only |
| Scoped CSS custom properties on `:host` | SCSS only |
| Pseudo-selectors with no Tailwind variant | SCSS only |
