/* ============================================================================
   people-context.js — Site Characterisation: People Context (ASEAN)
   SINGLE SOURCE for the People Context pane content (data, charts, render).
   Used by:
     - interactive-map.html + project-detail.html - auto-mounts into the
       [data-people-context] pane injected by js/analysis-shared.js
       (include AFTER analysis-shared.js)
     - assets/F02 P2-people context/People_Context_ASEAN.html - standalone
       mock, calls NBS_PEOPLE.mount() with its own header select
   Styles: css/people-context.css (scoped under .pcx).
   ============================================================================ */
const NBS_PEOPLE=(()=>{
/* ============ section meta (icons reused from People_Context_* pages) ============ */
const MI={
 people:'<path d="M12 12.75c1.63 0 3.07.39 4.24.9c1.08.48 1.76 1.56 1.76 2.73V17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-.61c0-1.18.68-2.26 1.76-2.73c1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1c-.99 0-1.93.21-2.78.58A2.01 2.01 0 0 0 0 16.43V17c0 .55.45 1 1 1h3.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85A6.95 6.95 0 0 0 20 14c-.39 0-.76.04-1.13.1c.4.68.63 1.46.63 2.29V18H23c.55 0 1-.45 1-1v-.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3z"/>',
 brief:'<path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>',
 grad:'<path d="M5 13.18v2.81c0 .73.4 1.41 1.04 1.76l5 2.73c.6.33 1.32.33 1.92 0l5-2.73c.64-.35 1.04-1.03 1.04-1.76v-2.81l-6.04 3.3c-.6.33-1.32.33-1.92 0L5 13.18zm6.04-9.66l-8.43 4.6c-.69.38-.69 1.38 0 1.76l8.43 4.6c.6.33 1.32.33 1.92 0L21 10.09V16c0 .55.45 1 1 1s1-.45 1-1V9.59c0-.37-.2-.7-.52-.88l-9.52-5.19a2.04 2.04 0 0 0-1.92 0z"/>',
 cash:'<path d="M23 8v10c0 1.1-.9 2-2 2H5c-.55 0-1-.45-1-1s.45-1 1-1h16V8c0-.55.45-1 1-1s1 .45 1 1zM4 16c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h12c1.66 0 3 1.34 3 3v7c0 1.1-.9 2-2 2H4zm3-6c0 1.66 1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3z"/>',
 heart:'<path d="M15.11 12.45L14 10.24l-3.11 6.21c-.16.34-.51.55-.89.55s-.73-.21-.89-.55L7.38 13H2v5c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-5h-6c-.38 0-.73-.21-.89-.55z"/><path d="M20 4H4c-1.1 0-2 .9-2 2v5h6c.38 0 .73.21.89.55L10 13.76l3.11-6.21c.34-.68 1.45-.68 1.79 0L16.62 11H22V6c0-1.1-.9-2-2-2z"/>',
 house:'<path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"/>',
 graph:'<path d="M21 8c-1.45 0-2.26 1.44-1.93 2.51l-3.55 3.56c-.3-.09-.74-.09-1.04 0l-2.55-2.55C12.27 10.45 11.46 9 10 9c-1.45 0-2.27 1.44-1.93 2.52l-4.56 4.55C2.44 15.74 1 16.55 1 18c0 1.1.9 2 2 2c1.45 0 2.26-1.44 1.93-2.51l4.55-4.56c.3.09.74.09 1.04 0l2.55 2.55C12.73 16.55 13.54 18 15 18c1.45 0 2.27-1.44 1.93-2.52l3.56-3.55c1.07.33 2.51-.48 2.51-1.93c0-1.1-.9-2-2-2z"/><path d="M15 9l.94-2.07L18 6l-2.06-.93L15 3l-.92 2.07L12 6l2.08.93zM3.5 11L4 9l2-.5L4 8l-.5-2L3 8l-2 .5L3 9z"/>',
 book:'<path d="M17.5 4.5c-1.95 0-4.05.4-5.5 1.5c-1.45-1.1-3.55-1.5-5.5-1.5c-1.45 0-2.99.22-4.28.79C1.49 5.62 1 6.33 1 7.14v11.28c0 1.3 1.22 2.26 2.48 1.94c.98-.25 2.02-.36 3.02-.36c1.56 0 3.22.26 4.56.92c.6.3 1.28.3 1.87 0c1.34-.67 3-.92 4.56-.92c1 0 2.04.11 3.02.36c1.26.33 2.48-.63 2.48-1.94V7.14c0-.81-.49-1.52-1.22-1.85c-1.28-.57-2.82-.79-4.27-.79zM21 17.23c0 .63-.58 1.09-1.2.98c-.75-.14-1.53-.2-2.3-.2c-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5c.92 0 1.83.09 2.7.28c.46.1.8.51.8.98v9.47z"/>',
 hospital:'<path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 11h-3v3c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1v-3H7c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1h3V7c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v3h3c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1z"/>',
 badge:'<circle cx="12" cy="4" r="2"/><path d="M19 11.9c0-.49-.36-.89-.84-.97a5.762 5.762 0 0 1-3.23-1.76l-1.29-1.43c-.17-.19-.38-.34-.61-.45c-.01 0-.01-.01-.02-.01H13c-.37-.21-.78-.31-1.25-.25C10.73 7.15 10 8.07 10 9.1V15c0 1.1.9 2 2 2h5v4c0 .55.45 1 1 1s1-.45 1-1v-4.5c0-1.1-.9-2-2-2h-3v-3.45c1 .83 2.4 1.54 3.8 1.82c.62.13 1.2-.34 1.2-.97zM12.83 18c-.41 1.16-1.52 2-2.83 2c-1.66 0-3-1.34-3-3c0-1.31.84-2.41 2-2.83V12.1a5 5 0 1 0 5.9 5.9h-2.07z"/>',
 personplus:'<path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm-9-2V8c0-.55-.45-1-1-1s-1 .45-1 1v2H2c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1H6zm9 4c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z"/>',
 droplet:'<path d="M12.66 2.58c-.38-.33-.95-.33-1.33 0C6.45 6.88 4 10.62 4 13.8c0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.18-2.45-6.92-7.34-11.22zM7.83 14c.37 0 .67.26.74.62c.41 2.22 2.28 2.98 3.64 2.87c.43-.02.79.32.79.75c0 .4-.32.73-.72.75c-2.13.13-4.62-1.09-5.19-4.12a.75.75 0 0 1 .74-.87z"/>',
 well:'<path d="M5.35 13c1.19 0 1.42 1 3.33 1c1.95 0 2.09-1 3.33-1c1.19 0 1.42 1 3.33 1c1.95 0 2.09-1 3.33-1c.93 0 1.05.45 2.01.79c.63.22 1.3-.24 1.3-.91c0-.52-.23-.83-.64-.97c-.6-.22-1.15-.9-2.69-.9c-1.95 0-2.09 1-3.33 1c-1.19 0-1.42-1-3.33-1c-1.95 0-2.09 1-3.33 1c-1.19 0-1.42-1-3.33-1c-1.54 0-2.13.71-2.68.91c-.41.13-.65.43-.65.97c0 .67.66 1.13 1.29.91c1.06-.36 1.1-.8 2.06-.8zm13.32 2c-1.95 0-2.09 1-3.33 1c-1.19 0-1.42-1-3.33-1c-1.95 0-2.1 1-3.34 1c-1.24 0-1.38-1-3.33-1c-1.53 0-2.15.71-2.69.91c-.41.14-.65.45-.65.98c0 .67.66 1.13 1.3.91c1.02-.36 1.08-.8 2.04-.8c1.24 0 1.38 1 3.33 1c1.95 0 2.1-1 3.34-1c1.19 0 1.42 1 3.33 1c1.94 0 2.09-1 3.33-1c.94 0 1.06.46 2.03.8c.63.22 1.3-.24 1.3-.91c0-.53-.24-.83-.65-.98c-.53-.19-1.14-.91-2.68-.91zM5.35 9c1.19 0 1.42 1 3.33 1c1.95 0 2.09-1 3.33-1c1.19 0 1.42 1 3.33 1c1.95 0 2.09-1 3.33-1c.93 0 1.05.45 2.01.79c.63.22 1.3-.24 1.3-.91c0-.52-.23-.83-.64-.97c-.6-.23-1.15-.91-2.69-.91c-1.95 0-2.09 1-3.33 1c-1.19 0-1.42-1-3.33-1c-1.95 0-2.09 1-3.33 1c-1.19 0-1.42-1-3.33-1c-1.54 0-2.13.71-2.68.91c-.41.14-.65.44-.65.98c0 .67.66 1.13 1.29.91c1.06-.36 1.1-.8 2.06-.8z"/>',
 bucket:'<path d="M19.28 4.93l-2.12-2.12c-.78-.78-2.05-.78-2.83 0L11.5 5.64l2.12 2.12l2.12-2.12l3.54 3.54a3.012 3.012 0 0 0 0-4.25zM5.49 13.77c.59.59 1.54.59 2.12 0l2.47-2.47l-2.12-2.13l-2.47 2.47c-.59.59-.59 1.54 0 2.13z"/><path d="M14.33 8.46l-.71.71l-3.18-3.18a1.49 1.49 0 0 0-2.12 0a1.49 1.49 0 0 0 0 2.12l3.18 3.18l-7 7c-.7.7-.88 1.84-.29 2.65a2.005 2.005 0 0 0 3.05.26l9.19-9.2a.996.996 0 1 0 1.41-1.41l-2.12-2.12a.987.987 0 0 0-1.41-.01z"/>',
 bottle:'<path d="M5.23 2C4.04 2 3.11 3.04 3.24 4.22l1.77 16.01C5.13 21.23 5.97 22 7 22h10c1.03 0 1.87-.77 1.99-1.77l1.77-16.01c.13-1.18-.8-2.22-1.99-2.22H5.23zM12 19c-1.66 0-3-1.34-3-3c0-1.55 1.81-3.95 2.62-4.94c.2-.25.57-.25.77 0c.81 1 2.62 3.39 2.62 4.94A3.01 3.01 0 0 1 12 19zm6.33-11H5.67l-.32-2.89c-.06-.59.4-1.11 1-1.11h11.3c.59 0 1.06.52.99 1.11L18.33 8z"/>',
 trash:'<path d="M6.2 7.41a.501.501 0 0 1-.17-.68L7.2 4.78l1.03-1.71c.39-.65 1.33-.65 1.72 0l1.48 2.46l-1.23 2.06l-.72 1.2a.54.54 0 0 1-.71.17L6.2 7.41zm15.52 5.56l-1.34-2.24a.512.512 0 0 0-.68-.18l-2.6 1.5c-.24.14-.32.45-.18.69L18.87 16h1.09c.61 0 1.2-.26 1.59-.73c.3-.37.45-.82.45-1.27c0-.36-.1-.71-.28-1.03zM16 21h1.5a2 2 0 0 0 1.79-1.11L20.74 17H16v-.79c0-.45-.54-.67-.85-.35l-2.79 2.79c-.2.2-.2.51 0 .71l2.79 2.79a.5.5 0 0 0 .85-.35V21zm-6.5-4H5.7l-.84 1.41c-.3.5-.32 1.12-.06 1.65c.28.57.87.94 1.52.94H9.5c.28 0 .5-.22.5-.5v-3c0-.28-.22-.5-.5-.5zm-3.38-2.65l.7.42c.38.23.85-.12.74-.55l-.96-3.84a.49.49 0 0 0-.6-.36l-3.83.96c-.43.11-.52.68-.14.91l.66.4l-.41.69c-.35.59-.38 1.31-.07 1.92l1.63 3.26l2.28-3.81zm10.9-9.21l-1.3-2.17C15.35 2.37 14.7 2 14 2h-3.53l3.12 5.2l-.69.41c-.38.23-.3.81.14.91l3.83.96c.27.07.54-.1.61-.36l.96-3.83a.499.499 0 0 0-.74-.55l-.68.4z"/>',
 tree:'<path d="M14.14 12h-.06c.81 0 1.28-.91.82-1.57L9.82 3.17a1 1 0 0 0-1.64 0L3.1 10.43c-.46.66.01 1.57.82 1.57h-.06L.99 16.46c-.43.66.05 1.54.84 1.54H7v2c0 1.1.9 2 2 2s2-.9 2-2v-2h5.17c.79 0 1.27-.88.84-1.54L14.14 12z"/><path d="M23.01 16.46L20.14 12h-.06c.81 0 1.28-.91.82-1.57l-5.08-7.26a1 1 0 0 0-1.64 0l-1.57 2.24l3.11 4.44a2.004 2.004 0 0 1-.16 2.5l2.29 3.57c.4.62.42 1.4.07 2.04c-.01.02-.02.03-.03.04h4.28c.79 0 1.27-.88.84-1.54zM13 20c0 1.1.9 2 2 2s2-.9 2-2v-1h-4v1z"/>',
 shield:'<path d="M11.3 2.26l-6 2.25C4.52 4.81 4 5.55 4 6.39v4.7c0 4.83 3.13 9.37 7.43 10.75c.37.12.77.12 1.14 0c4.3-1.38 7.43-5.92 7.43-10.75v-4.7c0-.84-.52-1.58-1.3-1.87l-6-2.25c-.45-.18-.95-.18-1.4-.01z"/>',
 apartment:'<path d="M17 11V5c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h5c.55 0 1-.45 1-1v-3h2v3c0 .55.45 1 1 1h5c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2h-2zM7 19H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm4 4H9v-2h2v2zm0-4H9V9h2v2zm0-4H9V5h2v2zm4 8h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2z"/>',
 park:'<path d="M16.96 12h.08c.81 0 1.28-.91.82-1.57l-5.08-7.25a1 1 0 0 0-1.64 0L6.1 10.43c-.46.66.02 1.57.83 1.57h.04l-2.9 4.46c-.44.66.04 1.54.84 1.54h5.08v2.02c0 1.09.89 1.98 1.98 1.98c1.09 0 1.98-.89 1.98-1.98V18h5.15c.8 0 1.28-.89.83-1.55L16.96 12z"/>',
 paid:'<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm.88 15.76v.36c0 .48-.39.88-.88.88c-.48 0-.88-.39-.88-.88v-.42c-.63-.15-1.93-.61-2.69-2.1c-.23-.44-.01-.99.45-1.18l.07-.03c.41-.17.87 0 1.08.39c.32.61.95 1.37 2.12 1.37c.93 0 1.98-.48 1.98-1.61c0-.96-.7-1.46-2.28-2.03c-1.1-.39-3.35-1.03-3.35-3.31c0-.1.01-2.4 2.62-2.96v-.36c0-.49.4-.88.88-.88s.88.39.88.88v.37c1.07.19 1.75.76 2.16 1.3c.34.44.16 1.08-.36 1.3c-.36.15-.78.03-1.02-.28c-.28-.38-.78-.77-1.6-.77c-.7 0-1.81.37-1.81 1.39c0 .95.86 1.31 2.64 1.9c2.4.83 3.01 2.05 3.01 3.45c0 2.63-2.5 3.13-3.02 3.22z"/>',
 diversity:'<path d="M6.32 13.01c.96.02 1.85.5 2.45 1.34A3.961 3.961 0 0 0 12 16c1.29 0 2.5-.62 3.23-1.66c.6-.84 1.49-1.32 2.45-1.34c-.72-1.22-3.6-2-5.68-2c-2.07 0-4.96.78-5.68 2.01zM4 13c1.66 0 3-1.34 3-3S5.66 7 4 7s-3 1.34-3 3s1.34 3 3 3zm16 0c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3s1.34 3 3 3zm-8-3c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3s1.34 3 3 3z"/><path d="M21 14h-3.27c-.77 0-1.35.45-1.68.92c-.04.06-1.36 2.08-4.05 2.08c-1.43 0-3.03-.64-4.05-2.08c-.39-.55-1-.92-1.68-.92H3c-1.1 0-2 .9-2 2v3c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-1.26c1.15.8 2.54 1.26 4 1.26s2.85-.46 4-1.26V19c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-3c0-1.1-.9-2-2-2z"/>',
 man:'<path d="M14 7h-4c-1.1 0-2 .9-2 2v5c0 .55.45 1 1 1h1v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6h1c.55 0 1-.45 1-1V9c0-1.1-.9-2-2-2z"/><circle cx="12" cy="4" r="2"/>',
 woman:'<circle cx="12" cy="4" r="2"/><path d="M16.45 14.63l-2.52-6.32c-.32-.79-1.08-1.3-1.94-1.31c-.85 0-1.62.51-1.94 1.31l-2.52 6.32c-.25.66.24 1.37.94 1.37H10v5c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-5h1.53c.7 0 1.19-.71.92-1.37z"/>',
 medserv:'<path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm5 11h-2v2c0 .55-.45 1-1 1s-1-.45-1-1v-2H9c-.55 0-1-.45-1-1s.45-1 1-1h2v-2c0-.55.45-1 1-1s1 .45 1 1v2h2c.55 0 1 .45 1 1s-.45 1-1 1z"/>',
 meds:'<path d="M17 3H7c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1zm0 3H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-2.5 9h-1v1c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-1h-1c-.83 0-1.5-.67-1.5-1.5S8.67 12 9.5 12h1v-1c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v1h1c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>',
 wc:'<path d="M5.5 21v-6.5H5c-.55 0-1-.45-1-1V9c0-1.1.9-2 2-2h3c1.1 0 2 .9 2 2v4.5c0 .55-.45 1-1 1h-.5V21c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1zM18 21v-5h1.61c.68 0 1.16-.67.95-1.32l-2.1-6.31A2.01 2.01 0 0 0 16.56 7h-.12a2 2 0 0 0-1.9 1.37l-2.1 6.31c-.22.65.26 1.32.95 1.32H15v5c0 .55.45 1 1 1h1c.55 0 1-.45 1-1zM7.5 6c1.11 0 2-.89 2-2s-.89-2-2-2s-2 .89-2 2s.89 2 2 2zm9 0c1.11 0 2-.89 2-2s-.89-2-2-2s-2 .89-2 2s.89 2 2 2z"/>'};

const SECT={
 demography:{cls:'theme-demography',icon:'people',title:'Social (Demography)'},
 employment:{cls:'theme-employment',icon:'brief',title:'Employment'},
 education:{cls:'theme-education',icon:'grad',title:'Education'},
 economy:{cls:'theme-economy',icon:'cash',title:'Economy'},
 health:{cls:'theme-health',icon:'heart',title:'Health'},
 housing:{cls:'theme-housing',icon:'house',title:'Housing & Human Settlements'}};
const SHADES={
 employment:['#3b34c4','#564efa','#8d87fb','#c6c2fd','#e6e4fe'],
 education:['#1c4f9e','#2f72e0','#7aa8ee','#b8d0f6','#e0ebfb'],
 economy:['#9c5d12','#e08a1e','#ebb35b','#f0d09a','#f7e7cc'],
 housing:['#0d6670','#1796a3','#6cc0c9','#a8dbe0','#d6eef1'],
 health:['#a32f44','#e0556b','#ec8d9c','#f5c3cb','#fbe3e8'],
 demography:['#055143','#077f68','#5cb8a3','#9ed8cb','#d3efe7']};

/* ============ indicator icons (Bootstrap Icons, MIT — same pack react-icons ships as "bs") ============ */

const SECT_IC={demography:'people',employment:'brief',education:'grad',economy:'cash',health:'heart',housing:'house'};
function icv(k){return `<svg viewBox="0 0 24 24">${MI[k]||MI.people}</svg>`;}
function iconFor(t,key){t=t.toLowerCase();
 if(t.includes('income'))return 'cash';
 if(t.includes('households')&&t.includes('number'))return 'house';
 if(t.includes('educated')||t.includes('literacy'))return 'book';
 if(t.includes('students'))return 'grad';
 if(t.includes('gini')||t.includes('inequality')||t.includes('industries')||t.includes('sector'))return 'graph';
 if(t.includes('health facilities'))return 'hospital';
 if(t.includes('disability'))return 'badge';
 if(t.includes('stunting')||t.includes('diseases'))return 'heart';
 if(t.includes('wastewater'))return 'trash';
 if(t.includes('toilet'))return 'wc';
 if(t.includes('water'))return 'droplet';
 if(t.includes('house types'))return 'house';
 if(t.includes('forest'))return 'tree';
 if(t.includes('unemployment')||t.includes('underemployment'))return 'brief';
 if(t.includes('employment'))return 'personplus';
 if(t.includes('population'))return 'people';
 return SECT_IC[key]||'people';}
function waterIcon(n){n=n.toLowerCase();
 if(/refill|bottle|newater|desalinat/.test(n))return 'bottle';
 if(/well|spring|rain|catchment/.test(n))return 'well';
 if(/bore|tube|pump/.test(n))return 'bucket';
 return 'droplet';}
function esc(s){return String(s||'').replace(/"/g,'&quot;');}
function num(s){s=String(s);let v=parseFloat(s.replace(/,/g,''))||0;if(/m/i.test(s))v*=1e6;return v;}
function cnt(n){return n>=1e6?(n/1e6).toFixed(2)+' M':(Math.round(n/100)*100).toLocaleString('en-US');}
function yearLabels(unit,n){const m=/(\d{4})\s*[–-]\s*(\d{4})/.exec(unit||'');
 return Array.from({length:n},(_,i)=>m?String(+m[2]-n+1+i):'');}

/* ============ svg chart builders (hover → tooltip via data-tip) ============ */
function svgDonut(segs,colors,unit){const size=116,tot=segs.reduce((a,s)=>a+s.v,0)||1;
 const R=size*.42,r=size*.26,cx=size/2,cy=size/2;let a=-Math.PI/2,p='';
 segs.forEach((s,i)=>{const ang=Math.min(s.v/tot*2*Math.PI,2*Math.PI-.0001),a2=a+ang,big=ang>Math.PI?1:0;
  const x1=cx+R*Math.cos(a),y1=cy+R*Math.sin(a),x2=cx+R*Math.cos(a2),y2=cy+R*Math.sin(a2);
  const xi1=cx+r*Math.cos(a),yi1=cy+r*Math.sin(a),xi2=cx+r*Math.cos(a2),yi2=cy+r*Math.sin(a2);
  p+=`<path data-tip="${esc(s.n)}: ${s.v}%" d="M${x1} ${y1} A${R} ${R} 0 ${big} 1 ${x2} ${y2} L${xi2} ${yi2} A${r} ${r} 0 ${big} 0 ${xi1} ${yi1} Z" fill="${colors[i%colors.length]}"/>`;a=a2;});
 return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" style="flex-shrink:0">${p}</svg>`;}
function svgLine(pts,color,soft,labels){const W=270,H=88,pad=8,mn=Math.min(...pts),mx=Math.max(...pts);
 const xy=pts.map((v,i)=>[pad+i/(pts.length-1)*(W-2*pad),H-pad-((v-mn)/((mx-mn)||1))*(H-2*pad-8)]);
 const d=xy.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
 return `<svg viewBox="0 0 ${W} ${H}" width="100%"><path d="${d} L${W-pad} ${H-pad} L${pad} ${H-pad} Z" fill="${soft}"/><path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"/>${xy.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="2.4" fill="${color}"/><circle data-tip="${esc(labels&&labels[i]?labels[i]+': ':'')}${pts[i]}" cx="${p[0]}" cy="${p[1]}" r="8" fill="transparent"/>`).join('')}</svg>`;}
function svgBars(items,color,deep,unit){const n=items.length,W=Math.max(220,n*56),cw=W/n,bw=Math.min(34,cw*.5);let s='';
 const max=Math.max(...items.map(i=>i.v))||1;
 items.forEach((it,i)=>{const h=(it.v/max)*80,x=i*cw+(cw-bw)/2,y=98-h;
  s+=`<rect data-tip="${esc(it.n)}: ${it.v}${it.suf||''}" x="${x}" y="${y}" width="${bw}" height="${h}" rx="3" fill="${i===0?deep:color}"/><text x="${x+bw/2}" y="${y-4}" text-anchor="middle" font-size="9" font-weight="700" fill="#252525">${it.v}${it.suf||''}</text><text x="${x+bw/2}" y="112" text-anchor="middle" font-size="7.5" fill="#68727d">${it.n}</text>`;});
 return `<svg viewBox="0 0 ${W} 118" width="100%" style="max-width:${Math.round(W*1.5)}px;display:block;margin:0 auto">${s}</svg>`;}
function lum(c){const x=parseInt(c.slice(1),16);return (.299*(x>>16&255)+.587*(x>>8&255)+.114*(x&255))/255;}
function svgStack(segs,colors,W){W=W||300;let x=0,s='';const tot=segs.reduce((a,g)=>a+g.v,0)||1;
 const H=26,FS=Math.round(10*W/300);
 const tips=segs.map(g=>`<span class="stg" data-tip="${esc(g.n)}: ${g.v}%" style="width:${g.v/tot*100}%;background:${colors[segs.indexOf(g)%colors.length]};color:${lum(colors[segs.indexOf(g)%colors.length])>.62?'#3a3f45':'#fff'}">${g.v/tot*100>=7?Math.round(g.v/tot*100)+'%':''}</span>`).join('');
 return `<div class="stbar">${tips}</div>`;
 segs.forEach((g,i)=>{const w=g.v/tot*W,fill=colors[i%colors.length],txt=lum(fill)>.62?'#3a3f45':'#fff';s+=`<rect data-tip="${esc(g.n)}: ${g.v}%" x="${x}" y="0" width="${w}" height="26" fill="${fill}"/>${w>26?`<text x="${x+w/2}" y="17" text-anchor="middle" font-size="10" font-weight="600" fill="${txt}" pointer-events="none">${Math.round(g.v/tot*100)}%</text>`:''}`;x+=w;});
 return `<svg viewBox="0 0 ${W} 26" width="100%" style="border-radius:5px;display:block">${s}</svg>`;}
function svgPyramid(rows,mTot,fTot){rows=rows.slice().reverse();const W=300,H=196,cx=W/2,gap=20,bh=H/rows.length-2;
 const sm=rows.reduce((a,r)=>a+r.m,0)||1,sf=rows.reduce((a,r)=>a+r.f,0)||1;
 const band=a=>{const n=parseInt(a);return n>=45?'#044c3e':n>=15?'#077f68':'#9ed8cb';};let s='';
 const max=Math.max(...rows.flatMap(r=>[r.m,r.f]))||1;
 rows.forEach((r,i)=>{const y=i*(bh+2),lw=r.m/max*(cx-gap-4),rw=r.f/max*(cx-gap-4);
  const tip=mTot?`Age ${r.a} — Male ${cnt(mTot*r.m/sm)} · Female ${cnt(fTot*r.f/sf)}`:`Age ${r.a} — Male ${r.m}% · Female ${r.f}%`;
  s+=`<rect data-tip="${tip}" x="${cx-gap-lw}" y="${y}" width="${lw}" height="${bh}" rx="1.5" fill="${band(r.a)}"/><rect data-tip="${tip}" x="${cx+gap}" y="${y}" width="${rw}" height="${bh}" rx="1.5" fill="${band(r.a)}" opacity=".62"/><text x="${cx}" y="${y+bh-1.5}" text-anchor="middle" font-size="7" fill="#68727d">${r.a}</text>`;});
 return `<svg viewBox="0 0 ${W} ${H}" width="100%">${s}</svg>`;}
function gauge(level,tipTxt){const L=['Very Low','Low','Moderate','High','Very High'],C=['#077f68','#8fd14f','#f4d03f','#eb984e','#e0556b'],idx=L.indexOf(level);
 return `<div class="gsteps" data-tip="${esc(tipTxt||level)}">${L.map((l,i)=>`<span class="gs${i<=idx?' on':''}" style="${i<=idx?`background:${C[idx]};`:''}"></span>`).join('')}</div><div class="gscale"><span>Very Low</span><span>Very High</span></div>`;}
function dots(pct){const on=Math.round(pct/10);let s='';for(let i=0;i<10;i++)s+=`<span class="dot${i<on?' on':''}"></span>`;return s;}

/* ============ card factory ============ */
function card(key,c,wide){
 const sh=SHADES[key]||SHADES.demography;
 const ic=c.ic||iconFor(c.t,key);
 if((c.viz==='pct'||c.viz==='kpi')&&c.hero)return `<div class="dcard kcard hero"><div class="dc-t"><span class="ti">${icv(ic)}</span>${c.t}</div><div class="dc-body"><div class="kval">${c.value}</div>${c.parts?`<div class="picto-cols" style="grid-template-columns:repeat(${c.parts.length},1fr);margin-top:12px">${c.parts.map(p=>`<div class="picto-col" data-tip="${esc(p.n)}: ${p.v}"><span class="picon">${icv(p.ic)}</span><span class="pc">${p.v}</span><span class="nm">${p.n}</span></div>`).join('')}</div>`:''}</div></div>`;
 if(c.viz==='pct'||c.viz==='kpi')return `<div class="dcard kcard"><div class="dc-t"><span class="ti">${icv(ic)}</span>${c.t}</div><div class="dc-body"><div class="kval">${c.value}</div></div></div>`;
 let body='';
 switch(c.viz){
  case 'ranked': if(c.items.every(it=>/^[\d.]+%$/.test(String(it.v||'').trim()))){body=`<div class="hbars">${c.items.map((it,i)=>`<div class="hbar" data-tip="${esc(it.n)}: ${esc(it.v)}"><span class="hb-nm">${it.n}</span><span class="hb-track"><span class="hb-fill" style="width:${Math.max(parseFloat(it.v),2)}%;background:${sh[i%sh.length]}"></span></span><span class="hb-v">${it.v}</span></div>`).join('')}</div>`;break;}
   body=`<div class="ranked">${c.items.map((it,i)=>`<div class="rank" data-tip="${esc(it.n)}${it.v?': '+esc(it.v):''}"><span class="num">${i+1}</span><span class="nm">${it.n}</span>${it.tag?`<span class="tag ${it.tag}">${it.tag==='cont'?'Contagious':'Non-contagious'}</span>`:`<span class="v">${it.v||''}</span>`}</div>`).join('')}</div>`;break;
  case 'stacked': body=`${svgStack(c.segs,sh,wide?760:520)}<div class="legend">${c.segs.map((g,i)=>`<span class="lg"><span class="sw" style="background:${sh[i%sh.length]}"></span>${g.n}</span>`).join('')}</div>`;break;
  case 'donut': body=`<div class="donut-wrap">${svgDonut(c.segs,sh)}<div class="donut-lg">${c.segs.map((g,i)=>`<div class="dl"><span class="sw" style="background:${sh[i%sh.length]}"></span><span class="nm">${g.n}</span><span class="pc">${g.v}%</span></div>`).join('')}</div></div>`;break;
  case 'line': body=svgLine(c.pts,sh[1],sh[4],yearLabels(c.unit,c.pts.length));break;
  case 'bars': body=svgBars(c.items,sh[1],sh[0]);break;
  case 'picto': body=`<div class="picto-cols">${c.items.map(it=>`<div class="picto-col" data-tip="${esc(it.n)}: ${it.v}% of households"><span class="picon">${icv(waterIcon(it.n))}</span><span class="nm">${it.n}</span><span class="pc">${it.v}%</span><div class="dots">${dots(it.v)}</div></div>`).join('')}</div>${c.access?`<div class="picto-col acc" data-tip="${esc(c.access.t)}: ${c.access.value} (${esc(c.access.unit||'')})" style="padding-top:9px;padding-bottom:9px;margin-top:8px"><span class="picon">${icv('droplet')}</span><span class="nm">${c.access.t}</span><span class="pc">${c.access.value}</span></div>`:''}`;break;
 }
 return `<div class="dcard${wide?' dc-wide':''}"><div class="dc-t"><span class="ti">${icv(ic)}</span>${c.t}</div>${c.unit?`<div class="dc-u">${c.unit}</div>`:''}<div class="dc-body">${body}</div></div>`;
}
function section(key,narr,cards,cols,srcLine){const s=SECT[key];
 const srcs=[...new Set(cards.map(c=>c.src).filter(Boolean))];
 let stats=cards.filter(c=>c.viz==='pct'||c.viz==='kpi');
 let charts=cards.filter(c=>c.viz!=='pct'&&c.viz!=='kpi');
 let aside='';
 if(key==='housing'){const ai=stats.findIndex(s=>/access to water/i.test(s.t));const pic=charts.find(c=>c.viz==='picto');if(ai>-1&&pic){pic.access=stats[ai];stats.splice(ai,1);}}
 if(stats.length===1){stats[0].hero=true;charts=stats.concat(charts);stats=[];}
 const sCols=Math.min(Math.max(stats.length,2),4);
 const isWide=c=>c.viz==='picto'||(key==='economy'&&c.viz==='stacked');
 const tail=charts.filter(c=>key==='economy'&&isWide(c));
 charts=charts.filter(c=>!tail.includes(c));
 charts=charts.filter(isWide).concat(charts.filter(c=>!isWide(c)));
 const rest=charts.filter(c=>!isWide(c));
 const cCols=rest.length<2?1:(rest.length===3&&rest.every(c=>c.viz==='bars'||c.viz==='stacked')?3:2);
 const odd=cCols>1&&rest.length%cCols===1;
 let body='';
 if(stats.length)body+=`<div class="grid${sCols}">${stats.map(c=>card(key,c)).join('')}</div>`;
 if(charts.length)body+=`<div class="grid${cCols}" style="align-items:${charts.some(c=>c.hero)?'stretch':'start'}${stats.length?';margin-top:12px':''}">${charts.map((c,i)=>card(key,c,isWide(c)||(odd&&i===charts.length-1))).join('')}</div>`;
 if(tail.length)body+=tail.map(c=>`<div style="margin-top:12px">${card(key,c,true)}</div>`).join('');
 return `<div class="sect ${s.cls}">
  <div class="sect-header"><span class="chip">${icv(s.icon)}</span><span class="eyebrow">${s.title}</span><span class="info-dot"><svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"/><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>
  ${aside?`<div class="narr-row"><p class="narrative">${narr}</p><div class="narr-aside">${aside}</div></div>`:`<p class="narrative">${narr}</p>`}
  <div class="well">${body}${srcs.length?`<div class="src"><span class="src-l">Data sources</span>${srcs.map(x=>`<span class="src-i">${x}</span>`).join('')}</div>`:''}</div></div>`;}

/* ============ regional (Southeast Asia) demography block — same layers for every country ============ */
const VULN_LEAD='Composite indices (0–1) summarising how susceptible the selected area is to climate hazards, across four dimensions:';
const VULN_TXT={
 p:'Condition of infrastructure, buildings, and critical facilities exposed to hazards.',
 e:'Ecosystem degradation, loss of natural buffers, and ecological resilience.',
 ec:'Dependence on climate-sensitive livelihoods, income stability, and diversification.',
 s:'Demographic and socio-economic capacity to prepare, respond, and recover.'};
const VULN_IC={p:'apartment',e:'park',ec:'paid',s:'diversity'};
const VULN_FULL={
 p:c=>`The selected area demonstrates a ${c.toLowerCase()} level of physical vulnerability to climate hazards. This assessment is based on the condition of infrastructure, buildings, critical facilities, and other physical assets exposed to climate-related hazards, which influence the area's ability to withstand and recover from climate impacts.`,
 e:c=>`The environmental conditions in the selected area are classified as having a ${c.toLowerCase()} level of vulnerability to climate hazards. This assessment is based on the degradation of ecosystems, the loss of natural buffers, and the reduction in ecological resilience, which influence the ability of ecosystems to withstand and recover from climate-related impacts.`,
 ec:c=>`The selected area has a ${c.toLowerCase()} level of economic vulnerability to climate hazards. This assessment is based on the community's dependence on climate-sensitive livelihoods, household income stability, asset bases, and economic diversification.`,
 s:c=>`Communities in the selected area have a ${c.toLowerCase()} level of social vulnerability to climate hazards. This assessment is based on demographic and socio-economic characteristics that influence the ability of people and communities to prepare for, respond to, and recover from climate-related impacts.`};
function vulnCard(title,k,level){return `<div class="vcard"><div class="vt"><span class="vic">${icv(VULN_IC[k])}</span>${title}<span class="vq" data-tip="${esc(VULN_FULL[k](level))}">?</span><span class="vlv">${level}</span></div><div class="vd">${VULN_TXT[k]}</div>${gauge(level,title+': '+level)}</div>`;}
function demoSection(d){
 const s=SECT.demography;
 const narr=`Gridded world population data puts the selected area at roughly <b>${d.pop}</b> people, about <b>${d.male}</b> men and <b>${d.female}</b> women.${d.hhNarr?' '+d.hhNarr:''} Vulnerability is scored 0 to 1 across the physical, environmental, economic, and social dimensions. Together, these indicate the size of the community and its exposure to climate hazards.`;
 const mv=num(d.male)||1,fv=num(d.female)||1;
 const mp=Math.round(mv/(mv+fv)*100),fp=100-mp;
 const paired=`<div class="genders"><div class="gfigs"><span class="gfig m" style="width:${mp}%">${icv('man')}</span><span class="gfig f" style="width:${fp}%">${icv('woman')}</span></div><div class="gbar"><div class="gm" data-tip="Male: ${d.male} (${mp}%)" style="width:${mp}%"><span class="gpc">${mp}%</span><span class="glb">Male</span><span class="gsub">${d.male}</span></div><div class="gf" data-tip="Female: ${d.female} (${fp}%)" style="width:${fp}%"><span class="gpc">${fp}%</span><span class="glb">Female</span><span class="gsub">${d.female}</span></div></div></div>`;
 const popCard=`<div class="dcard" style="flex:1"><div class="dc-t"><span class="ti">${icv('people')}</span>Estimated Populations</div><div class="dc-u">people · ~100 m grid</div><div class="dc-body" style="gap:12px"><div style="font-family:var(--font-display);font-weight:700;font-size:38px;line-height:42px;letter-spacing:-.5px;color:var(--accent-deep);text-align:center">${d.pop}</div>${paired}</div></div>`;
 const left=[popCard]
  .concat(d.hh?[card('demography',{t:'Number of Households',unit:'households · '+d.hh.gran,viz:'kpi',value:d.hh.value,src:d.hh.src})]:[]);
 const pyr=`<div class="dcard"><div class="dc-t"><span class="ti">${icv('people')}</span>Estimated Age Group</div><div class="dc-u">male &amp; female population by age group</div><div class="dc-body">${svgPyramid(d.rows,mv,fv)}<div class="pyr-foot"><span class="l">&#9664; Male</span><span class="r">Female &#9654;</span></div><div class="legend"><span class="lg"><span class="sw" style="background:#9ed8cb"></span>Age 0–14</span><span class="lg"><span class="sw" style="background:#077f68"></span>Age 15–44</span><span class="lg"><span class="sw" style="background:#044c3e"></span>Age 45–65+</span></div></div></div>`;
 const v=d.vuln;
 return `<div class="sect ${s.cls}">
  <div class="sect-header"><span class="chip">${icv(s.icon)}</span><span class="eyebrow">${s.title}</span><span class="info-dot"><svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.99935 18.3332C14.6017 18.3332 18.3327 14.6022 18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665C5.39698 1.6665 1.66602 5.39746 1.66602 9.99984C1.66602 14.6022 5.39698 18.3332 9.99935 18.3332Z" fill="currentColor"/><path d="M10 13.3332V9.99984M10 6.6665H10.0083" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>
  <p class="narrative">${narr}</p>
  <div class="well"><div class="grid2" style="align-items:stretch"><div style="display:flex;flex-direction:column;gap:12px">${left.join('')}</div>${pyr}</div>
  <div class="dcard" style="margin-top:12px"><div class="dc-t"><span class="ti">${icv('shield')}</span>Vulnerability Assessment</div><div class="dc-u">${VULN_LEAD}</div>
  <div class="grid2" style="margin-top:10px">
   ${vulnCard('Physical Vulnerability','p',v.p)}
   ${vulnCard('Environmental Vulnerability','e',v.e)}
   ${vulnCard('Economic Vulnerability','ec',v.ec)}
   ${vulnCard('Social Vulnerability','s',v.s)}
  </div></div>
  <div class="src"><span class="src-l">Data sources</span><span class="src-i">WorldPop constrained 2015–2030 · R2025A v1 · DOI:10.5258/SOTON/WP00839</span><span class="src-i">WorldPop age–sex breakdown · R2025A v1 · DOI:10.5258/SOTON/WP00841</span>${d.hh?`<span class="src-i">${d.hh.src}</span>`:''}<span class="src-i">ADPC harmonised vulnerability indices</span></div></div></div>`;}

/* ============ per-country content — indicators & narratives per GUI Design Document NBS Tool v3 ============ */
/* ponytail: values are illustrative samples for the mock; live values come from the data pipeline */
const AGE=[{a:'0-4',m:14,f:13},{a:'5-9',m:15,f:14},{a:'10-14',m:14,f:13},{a:'15-19',m:13,f:12},{a:'20-24',m:12,f:12},{a:'25-29',m:11,f:11},{a:'30-34',m:10,f:10},{a:'35-39',m:9,f:9},{a:'40-44',m:8,f:8},{a:'45-49',m:6,f:6},{a:'50-54',m:5,f:5},{a:'55-59',m:4,f:4},{a:'60-64',m:3,f:3},{a:'65+',m:4,f:5}];
const C={};

C.Indonesia={flag:'\u{1F1EE}\u{1F1E9}',
 demo:{pop:'252,400',male:'127,500',female:'124,900',rows:AGE,vuln:{p:'Moderate',e:'Very Low',ec:'Moderate',s:'Very High'},
  hh:{value:'58,700',gran:'adm2+ (village)',src:'demographic_number_of_households.csv · BPS · 2016–2024'},
  hhNarr:'In <b>Putussibau</b> Village, there are <b>58,700</b> households, as of 2024.'},
 sections:[
  section('employment',
   `In <b>West Kalimantan</b> Province, the unemployment rate is <b>5.2%</b>, underemployment is <b>8.7%</b>, and most are <b>informal employees</b> by work status. This shows the local jobs mix and which livelihoods climate change could strain, or NbS could support.`,
   [{t:'Unemployment Rate',unit:'% of labour force',viz:'pct',value:'5.2%',src:'demographic_unemployment_rate_open.csv · BPS · 2016–2024 · adm1'},
    {t:'Underemployment Rate',unit:'% of labour force',viz:'pct',value:'8.7%',src:'demographic_underemployment_rate.csv · BPS · 2015–2023 · adm1'},
    {t:'Employment by Sector',unit:'% of employed persons',viz:'stacked',segs:[{n:'Agriculture',v:54},{n:'Industry',v:26},{n:'Services',v:20}],src:'demographic_employment_by_sector.csv · BPS · 2017–2023 · adm1'}],2,
   'Unemployment Rate — Statistics Indonesia (BPS), 2016–2024; Underemployment Rate — BPS, 2015–2023; Employment by Sector — BPS, 2017–2023.'),
  section('education',
   `In <b>Putussibau</b> Village, most have finished <b>primary</b> school and <b>96,400</b> students are enrolled. In <b>West Kalimantan</b> Province, the literacy rate is <b>94.6%</b> (<b>96.1%</b> male, <b>93.1%</b> female). Together, these say how ready the community is to take part in NbS work.`,
   [{t:'Population Educated (School)',unit:'% of population by highest level completed',viz:'stacked',segs:[{n:'Primary',v:38},{n:'Junior secondary',v:24},{n:'Senior secondary',v:27},{n:'Tertiary',v:11}],src:'demographic_school.csv · BPS · adm2+'},
    {t:'Literacy Rate',unit:'% of community aged 15+',viz:'pct',value:'94.6%',src:'education_literacy_rate.csv · BPS · 2009–2023 · adm1'},
    {t:'Number of Students Enrolled',unit:'students',viz:'kpi',value:'96,400',src:'education_student_enrolment.csv · BPS · 2019–2022 · adm2+'}],2,
   'Population Educated (School) — BPS; Literacy Rate — BPS, 2009–2023; Number of Students Enrolled — BPS, 2019–2022.'),
  section('economy',
   `In <b>West Kalimantan</b> Province, incomes run highest in <b>mining &amp; quarrying</b>. This sketches local earning conditions and who may be exposed to climate change.`,
   [{t:'Average Household Income',unit:'Rp (IDR) / month, by sector',viz:'ranked',items:[{n:'Mining & Quarrying',v:'Rp 4.62 M'},{n:'Services',v:'Rp 3.48 M'},{n:'Manufacturing',v:'Rp 3.05 M'},{n:'Agriculture & Fishing',v:'Rp 2.31 M'}],src:'economy_income_net.csv · BPS · 2017–2023 · adm1'}],1,
   'Average Household Income — Statistics Indonesia (BPS), 2017–2023.'),
  section('health',
   `In <b>West Kalimantan</b> Province, the most common illnesses are <b>acute respiratory infection</b> and <b>hypertension</b>. These point to the health conditions NbS co-benefits could ease.`,
   [{t:'Top 5 Common Diseases',unit:'ranked by recorded cases',viz:'ranked',items:[{n:'Acute Resp. Infection',tag:'cont'},{n:'Hypertension',tag:'non'},{n:'Pulmonary TB',tag:'cont'},{n:'Diabetes Mellitus',tag:'non'},{n:'Pneumonia',tag:'cont'}],src:'health_disease.csv · BPS · 2018–2023 · adm1'}],1,
   'Top 5 Common Diseases — Statistics Indonesia (BPS), 2018–2023.'),
  section('housing',
   `In <b>West Kalimantan</b> Province, <b>78.4%</b> of households have access to improved drinking water. This covers the basic services and living conditions that shape how communities cope.`,
   [{t:'Households with Access to Water',unit:'% of households (improved source)',viz:'pct',value:'78.4%',src:'hhs_water_drinking_improved.csv · BPS · 2002–2023 · adm1'}],1,
   'Households with Access to Water — Statistics Indonesia (BPS), 2002–2023.')]};

C.Malaysia={flag:'\u{1F1F2}\u{1F1FE}',
 demo:{pop:'188,600',male:'96,100',female:'92,500',rows:AGE,vuln:{p:'Moderate',e:'Low',ec:'Low',s:'Moderate'},
  hh:{value:'1.79 M',gran:'adm1 (state)',src:'demographic_number_of_household.csv · DOSM · 1995–2022'},
  hhNarr:'In <b>Selangor</b> State, there are <b>1.79 M</b> households, as of 2022.'},
 sections:[
  section('employment',
   `In <b>Selangor</b> State, the unemployment rate is <b>3.3%</b>, most people work as <b>plant &amp; machine operators</b>, and the biggest employment sector is <b>services</b>. This shows the local jobs mix and which livelihoods climate change could strain, or NbS could support.`,
   [{t:'Unemployment Rate',unit:'% of labour force',viz:'pct',value:'3.3%',src:'demographic_unemployment_sex_rate.csv · DOSM · 1982–2020 · adm1'},
    {t:'Top 5 Industries / Occupations',unit:'% of employed persons',viz:'ranked',items:[{n:'Manufacturing',v:'23.5%'},{n:'Wholesale & Retail',v:'19.2%'},{n:'Construction',v:'9.7%'},{n:'Public Administration',v:'8.4%'},{n:'Accommodation & Food',v:'7.1%'}],src:'demographic_employment_occupation.csv · DOSM · 2011–2022 · adm1'},
    {t:'Employment by Sector',unit:'% of employed persons',viz:'stacked',segs:[{n:'Agriculture',v:11},{n:'Industry',v:36},{n:'Services',v:53}],src:'demographic_employment_industry.csv · DOSM · 2010–2022 · adm1'}],2,
   'Unemployment Rate — DOSM, 1982–2020; Top 5 Industries / Occupations — DOSM, 2011–2022; Employment by Sector — DOSM, 2010–2022.'),
  section('education',
   `In <b>Selangor</b> State, <b>520,000</b> students are enrolled. Together these say how ready the community is to take part in NbS work.`,
   [{t:'Number of Students Enrolled',unit:'students',viz:'kpi',value:'520,000',src:'education_school_student_pre.csv · DOSM · 2000–2021 · adm1'}],1,
   'Number of Students Enrolled — DOSM, 2000–2021.'),
  section('economy',
   `In <b>Selangor</b> State, the average household income is <b>RM (MYR) 8,479</b> a month. This sketches local earning conditions and who may be exposed to climate change.`,
   [{t:'Average Household Income',unit:'RM (MYR) / month',viz:'kpi',value:'RM 8,479',src:'economy_household_income_gross_mean.csv · DOSM · 1970–2022 · adm1'}],1,
   'Average Household Income — DOSM, 1970–2022.'),
  section('housing',
   `In <b>Selangor</b> State, <b>96.4%</b> of households have access to improved drinking water and <b>92%</b> of households have hygienic toilets. The reserved forest in the area covers <b>250,300 hectares</b>. This covers the basic services and living conditions that shape how communities cope.`,
   [{t:'Households with Access to Water',unit:'% of households (treated piped)',viz:'pct',value:'96.4%',src:'hhs_water_treated_pipe.csv · DOSM · 2000–2016 · adm1'},
    {t:'Toilet Facility Access',unit:'% of households (hygienic)',viz:'pct',value:'92%',src:'hhs_sanitary_latrines.csv · DOSM · 2000–2016 · adm1'},
    {t:'Permanent Reserved Forests',unit:'hectares',viz:'kpi',value:'250,300 ha',src:'other_forest_reserve.csv · DOSM · 2003–2021 · adm1'}],3,
   'Households with Access to Water — DOSM, 2000–2016; Toilet Facility Categories — DOSM, 2000–2016; Permanent Reserved Forests — DOSM, 2003–2021.')]};

C.Singapore={flag:'\u{1F1F8}\u{1F1EC}',
 demo:{pop:'5.92 M',male:'2.90 M',female:'3.02 M',
  rows:[{a:'0-4',m:8,f:8},{a:'5-14',m:10,f:10},{a:'15-24',m:11,f:11},{a:'25-34',m:13,f:13},{a:'35-44',m:12,f:12},{a:'45-54',m:11,f:11},{a:'55-64',m:9,f:9},{a:'65+',m:7,f:9}],
  vuln:{p:'Moderate',e:'Very Low',ec:'Low',s:'Moderate'},
  hh:{value:'1.43 M',gran:'national',src:'demographic_number_of_households.csv · SingStat · 2019–2025'},
  hhNarr:'The selected area covers roughly <b>1.43 M</b> households, as of 2025.'},
 sections:[
  section('employment',
   `The unemployment rate is <b>1.9%</b>, while the employment rate is <b>67.1%</b> (labour-force participation) and underemployment is <b>2.8%</b>. This shows the local jobs mix and which livelihoods climate change could strain, or NbS could support.`,
   [{t:'Unemployment Rate',unit:'% of labour force',viz:'pct',value:'1.9%',src:'demographic_unemployment_rate.csv · SingStat · 1992–2025 · national'},
    {t:'Employment Rate',unit:'% of working-age population 15+',viz:'pct',value:'67.1%',src:'demographic_employment_rate.csv · SingStat · 1990–2025 · national'},
    {t:'Underemployment Rate',unit:'% of labour force',viz:'pct',value:'2.8%',src:'time_related_underemployment.csv · SingStat · 2023–2025 · national'}],3,
   'Unemployment Rate — SingStat, 1992–2025; Employment Rate — SingStat, 1990–2025; Underemployment Rate — SingStat, 2023–2025.'),
  section('education',
   `The literacy rate is <b>97.6%</b> and <b>462,000</b> students are enrolled. Together, these say how ready the community is to take part in NbS work.`,
   [{t:'Literacy Rate',unit:'% of community aged 15+',viz:'pct',value:'97.6%',src:'education_literacy_rate.csv · SingStat · 1960–2021 · national'},
    {t:'Number of Students Enrolled',unit:'students',viz:'kpi',value:'462,000',src:'education_student_enrolment.csv · SingStat · 1990–2023 · national'}],2,
   'Literacy Rate — SingStat, 1960–2021; Number of Students Enrolled — SingStat, 1990–2023.'),
  section('economy',
   `The average household income is <b>SGD 11,300</b> a month. This sketches local earning conditions and who may be exposed to climate change.`,
   [{t:'Average Household Income',unit:'SGD / month',viz:'kpi',value:'SGD 11,300',src:'economy_household_income.csv · SingStat · 2000–2025 · national'}],1,
   'Average Household Income — SingStat, 2000–2025.'),
  section('health',
   `The most common illnesses are <b>hypertension</b> and <b>hyperlipidaemia</b>. These point to the health conditions NbS co-benefits could ease.`,
   [{t:'Top 4 Common Diseases',unit:'ranked by recorded cases',viz:'ranked',items:[{n:'Hypertension',tag:'non'},{n:'Hyperlipidaemia',tag:'non'},{n:'Diabetes Mellitus',tag:'non'},{n:'Asthma / COPD',tag:'non'}],src:'health_common_diseases.csv · SingStat · 2010–2022 · national'}],1,
   'Top 4 Common Diseases — SingStat, 2010–2022.'),
  section('housing',
   `Reserved forest covers <b>3,347 hectares</b> (<b>4.6%</b> of the land area), part of the area's natural buffer.`,
   [{t:'Permanent Reserved Forests',unit:'% of land area · 3,347 ha',viz:'pct',value:'4.6%',src:'land_forest_reserves.csv · SingStat · 2015–2020 · national'}],1,
   'Permanent Reserved Forests — SingStat, 2015–2020.')]};

C.Thailand={flag:'\u{1F1F9}\u{1F1ED}',
 demo:{pop:'1,290,000',male:'638,000',female:'652,000',rows:AGE,vuln:{p:'High',e:'Moderate',ec:'Moderate',s:'Moderate'},
  hh:{value:'402,000',gran:'adm1 (province)',src:'demographic_households_farmer.csv · NSO Thailand · 2013–2022'},
  hhNarr:'In <b>Chiang Rai</b> Province, there are <b>402,000</b> households, as of 2022.'},
 sections:[
  section('employment',
   `In <b>Chiang Rai</b> Province, the unemployment rate is <b>1.1%</b>, the biggest employment sector is <b>agriculture</b>, and most people work as <b>skilled agricultural workers</b>. This shows the local jobs mix and which livelihoods climate change could strain, or NbS could support.`,
   [{t:'Unemployment Rate',unit:'% of labour force',viz:'pct',value:'1.1%',src:'demographic_unemployment_rate.csv · NSO Thailand · 2015–2023 · adm1'},
    {t:'Employment by Sector',unit:'% of employed persons',viz:'stacked',segs:[{n:'Agriculture',v:45},{n:'Industry',v:22},{n:'Services',v:33}],src:'demographic_employment_economic_activity.csv · NSO Thailand · 2022–2023 · adm1'},
    {t:'Top 5 Industries / Occupations',unit:'% of employed persons',viz:'ranked',items:[{n:'Agriculture',v:'44.6%'},{n:'Wholesale & Retail',v:'16.8%'},{n:'Manufacturing',v:'11.4%'},{n:'Accommodation & Food',v:'8.2%'},{n:'Construction',v:'5.9%'}],src:'demographic_employment_occupation.csv · NSO Thailand · 2022–2023 · adm1'}],2,
   'Unemployment Rate — NSO Thailand, 2015–2023; Employment by Sector — NSO Thailand, 2022–2023; Top 5 Industries / Occupations — NSO Thailand, 2022–2023.'),
  section('education',
   `In <b>Chiang Rai</b> Province, most have finished <b>primary</b> school and <b>96,000</b> students are enrolled. Together, these say how ready the community is to take part in NbS work.`,
   [{t:'Population Educated (School)',unit:'% of population by highest level completed',viz:'stacked',segs:[{n:'Primary',v:44},{n:'Lower secondary',v:21},{n:'Upper secondary',v:22},{n:'Tertiary',v:13}],src:'education_attaintment.csv · NSO Thailand · adm1'},
    {t:'Number of Students Enrolled',unit:'students',viz:'kpi',value:'96,000',src:'education_student_size.csv · NSO Thailand · 2022–2023 · adm1'}],2,
   'Population Educated (School) — NSO Thailand; Number of Students Enrolled — NSO Thailand, 2022–2023.'),
  section('economy',
   `In <b>Chiang Rai</b> Province, the average household income is <b>Baht (THB) 27,352</b> a month. This sketches local earning conditions and who may be exposed to climate change.`,
   [{t:'Average Household Income',unit:'Baht (THB) / month',viz:'kpi',value:'&#3647; 27,352',src:'economy_household_income_monthly.csv · NSO Thailand · 2004–2023 · adm1'}],1,
   'Average Household Income — NSO Thailand, 2004–2023.'),
  section('health',
   `In <b>Chiang Rai</b> Province, the most common illnesses are <b>dengue</b> and <b>hypertension</b>. These point to the health conditions NbS co-benefits could ease.`,
   [{t:'Top 5 Common Diseases',unit:'ranked by recorded cases',viz:'ranked',items:[{n:'Dengue',tag:'cont'},{n:'Hypertension',tag:'non'},{n:'Diabetes',tag:'non'},{n:'Influenza',tag:'cont'},{n:'Tuberculosis',tag:'cont'}],src:'health_disease_outpatient.csv · NSO Thailand · 2016–2020 · adm1'}],1,
   'Top 5 Common Diseases — NSO Thailand, 2016–2020.')]};

C.Philippines={flag:'\u{1F1F5}\u{1F1ED}',
 demo:{pop:'1,100,000',male:'558,000',female:'542,000',rows:AGE,vuln:{p:'Very High',e:'High',ec:'Moderate',s:'High'},
  hh:{value:'793,000',gran:'adm1 (region)',src:'demographic_households.csv · PSA · 2020'},
  hhNarr:'In <b>MIMAROPA</b> Region, there are <b>793,000</b> households, as of 2020.'},
 sections:[
  section('employment',
   `In <b>MIMAROPA</b> Region, the unemployment rate is <b>4.3%</b>, while the employment rate is <b>95.7%</b> and underemployment is <b>14.0%</b>. Most people work as <b>skilled agricultural workers</b>, and the biggest employment sector is <b>agriculture</b>. This shows the local jobs mix and which livelihoods climate change could strain, or NbS could support.`,
   [{t:'Unemployment Rate',unit:'% of labour force',viz:'pct',value:'4.3%',src:'economy_unemployment_rate.csv · PSA · 2013–2022 · adm1'},
    {t:'Employment Rate',unit:'% of working-age population 15+',viz:'pct',value:'95.7%',src:'economy_employment_status.csv · PSA · 2013–2022 · adm1'},
    {t:'Underemployment Rate',unit:'% of employed persons',viz:'pct',value:'14.0%',src:'economy_underemployment_rate.csv · PSA · 2013–2022 · adm1'},
    {t:'Top 5 Industries / Occupations',unit:'% of employed persons',viz:'ranked',items:[{n:'Agriculture & Fishing',v:'38.4%'},{n:'Wholesale & Retail',v:'17.1%'},{n:'Construction',v:'9.2%'},{n:'Public Administration',v:'7.6%'},{n:'Transport & Storage',v:'6.4%'}],src:'economy_employment_occupation.csv · PSA · 2016–2022 · adm1'},
    {t:'Employment by Sector',unit:'% of employed persons',viz:'stacked',segs:[{n:'Agriculture',v:38},{n:'Industry',v:19},{n:'Services',v:43}],src:'economy_employment_by_sector.csv · PSA · 2016–2022 · adm1'}],2,
   'Unemployment Rate — PSA, 2013–2022; Employment Rate — PSA, 2013–2022; Underemployment Rate — PSA, 2013–2022; Top 5 Industries / Occupations — PSA, 2016–2022; Employment by Sector — PSA, 2016–2022.'),
  section('education',
   `In <b>MIMAROPA</b> Region, most have finished <b>elementary</b> school (<b>34%</b>). The literacy rate is <b>96.4%</b> (<b>96.1%</b> male, <b>96.7%</b> female). Together, these say how ready the community is to take part in NbS work.`,
   [{t:'Population Educated (School)',unit:'% of population by highest level completed',viz:'stacked',segs:[{n:'Elementary',v:34},{n:'Junior high',v:22},{n:'Senior high',v:26},{n:'Tertiary',v:18}],src:'education_school_attainment.csv · PSA · 2016–2022 · adm1'},
    {t:'Literacy Rate',unit:'% of community aged 15+',viz:'pct',value:'96.4%',src:'education_literacy_rate.csv · PSA · 2008–2019 · adm1'}],2,
   'Population Educated (School) — PSA, 2016–2022; Literacy Rate — PSA, 2008–2019.'),
  section('economy',
   `In <b>MIMAROPA</b> Region, the average household income is <b>PhP (PHP) 18,400</b> per month. This sketches local earning conditions and who may be exposed to climate change.`,
   [{t:'Average Household Income',unit:'PhP (PHP) / month',viz:'kpi',value:'&#8369; 18,400',src:'economy_income_expenditure.csv · PSA · 2012–2021 · adm1'}],1,
   'Average Household Income — PSA, 2012–2021.'),
  section('housing',
   `In <b>MIMAROPA</b> Region, the main drinking-water source is <b>piped into dwelling</b> and most toilets are <b>water-sealed</b> (<b>79%</b>). This covers the basic services and living conditions that shape how communities cope.`,
   [{t:'Households with Access to Water',unit:'% of households by main source',viz:'ranked',items:[{n:'Piped into dwelling',v:'55%'},{n:'Tubed / piped well',v:'18%'},{n:'Protected spring',v:'9%'},{n:'Other source',v:'18%'}],src:'hhs_drinking_water_supply.csv · PSA · 2020 · adm1'},
    {t:'Toilet Facility Categories',unit:'% of households',viz:'donut',segs:[{n:'Water-sealed',v:79},{n:'Closed pit',v:12},{n:'Shared / other',v:9}],src:'hhs_facility_toilet.csv · PSA · 2020 · adm1'}],2,
   'Households with Access to Water — PSA, 2020; Toilet Facility Categories — PSA, 2020.')]};

C.Vietnam={flag:'\u{1F1FB}\u{1F1F3}',
 demo:{pop:'1,360,000',male:'678,000',female:'682,000',rows:AGE,vuln:{p:'High',e:'Moderate',ec:'Low',s:'Moderate'}},
 sections:[
  section('employment',
   `In <b>Qu&#7843;ng Ninh</b> Province, the unemployment rate is <b>2.3%</b>, while underemployment is <b>2.0%</b> and <b>780,000</b> people are employed. This shows the local jobs mix and which livelihoods climate change could strain, or NbS could support.`,
   [{t:'Unemployment Rate',unit:'% of labour force',viz:'pct',value:'2.3%',src:'demographic_unemployment_sex.csv · GSO · 2018–2022 · adm1'},
    {t:'Underemployment Rate',unit:'% of labour force',viz:'pct',value:'2.0%',src:'demographic_underemployment_sex.csv · GSO · 2018–2022 · adm1'},
    {t:'Employment by Sector',unit:'employed persons',viz:'kpi',value:'780,000',src:'demographic_employment_informal.csv · GSO · 2018–2022 · adm1'}],3,
   'Unemployment Rate — GSO, 2018–2022; Underemployment Rate — GSO, 2018–2022; Employment by Sector — GSO, 2018–2022.'),
  section('education',
   `In the selected area, the most common highest level of schooling completed is <b>lower secondary</b>, the literacy rate is <b>95.8%</b>, and <b>110,000</b> students are enrolled (province-level data). These provide context on schooling and literacy, which shape how ready the community is for NbS work.`,
   [{t:'Population Educated (School)',unit:'people',viz:'kpi',value:'1.1 M',src:'education_general_pupils.csv · GSO · 2002–2021 · adm1'},
    {t:'Literacy Rate',unit:'% of community aged 15+',viz:'pct',value:'95.8%',src:'education_literacy_rate.csv · GSO · 2006–2023 · adm1'},
    {t:'Number of Students Enrolled',unit:'students',viz:'kpi',value:'110,000',src:'education_vocational.csv · GSO · adm1'}],3,
   'Population Educated (School) — GSO, 2002–2021; Literacy Rate — GSO, 2006–2023; Number of Students Enrolled — GSO.'),
  section('economy',
   `In <b>Qu&#7843;ng Ninh</b> Province, the average household income is <b>VND 4.67 M</b> per month per person. This sketches local earning conditions and who may be exposed to climate change.`,
   [{t:'Average Household Income',unit:'VND / month per person',viz:'kpi',value:'&#8363; 4.67 M',src:'economy_income_monthly_per_capita.csv · GSO · adm1'}],1,
   'Average Household Income — GSO.'),
  section('housing',
   `In <b>Qu&#7843;ng Ninh</b> Province, <b>96.2%</b> of households have access to improved drinking water and <b>88%</b> of households have access to improved sanitation. The permanent reserved forest covers <b>122,000 hectares</b> in this province, part of the area's natural buffer.`,
   [{t:'Households with Access to Water',unit:'% of households (improved source)',viz:'pct',value:'96.2%',src:'hhs_water_drinking_improved.csv · GSO · 2018–2023 · adm1'},
    {t:'Toilet Facility Categories',unit:'% of households (improved sanitation)',viz:'pct',value:'88%',src:'hhs_toilet_usage.csv · GSO · 2018–2023 · adm1'},
    {t:'Permanent Reserved Forests',unit:'hectares',viz:'kpi',value:'122,000 ha',src:'land_forest_reserves.csv · GSO · 2020–2024 · adm1'}],3,
   'Households with Access to Water — GSO, 2018–2023; Toilet Facility Categories — GSO, 2018–2023; Permanent Reserved Forests — GSO, 2020–2024.')]};

C.Laos={flag:'\u{1F1F1}\u{1F1E6}',
 demo:{pop:'7,500,000',male:'3,730,000',female:'3,770,000',rows:AGE,vuln:{p:'High',e:'High',ec:'High',s:'High'},
  hh:{value:'1.17 M',gran:'adm1 (province)',src:'demographic_number_of_households.csv · Lao Statistics Bureau · 2020–2024'},
  hhNarr:'In <b>Savannakhet</b> Province, there are <b>1.17 M</b> households, as of 2024.'},
 sections:[
  section('employment',
   `In <b>Savannakhet</b> Province, the unemployment rate is <b>2.5%</b> of the labour force. This shows the local jobs mix and which livelihoods climate change could strain, or NbS could support.`,
   [{t:'Unemployment Rate',unit:'% of labour force',viz:'pct',value:'2.5%',src:'employment_unemployment_rate.csv · Lao Statistics Bureau · 2018–2024 · adm1'}],1,
   'Unemployment Rate — Lao Statistics Bureau, 2018–2024.'),
  section('education',
   `The literacy rate is <b>87.1%</b>, providing context on schooling and literacy that shape the community's readiness for NbS work.`,
   [{t:'Literacy Rate',unit:'% of community aged 15+',viz:'pct',value:'87.1%',src:'education_literacy_rate.csv · Lao Statistics Bureau · 2023 · national'}],1,
   'Literacy Rate — Lao Statistics Bureau, 2023.'),
  section('housing',
   `<b>82.4%</b> of households have access to improved drinking water and <b>68%</b> of households have access to improved sanitation (national data). In <b>Savannakhet</b> Province, reserved forest covers <b>1.2 M hectares</b>. This covers the basic services and living conditions that shape how communities cope.`,
   [{t:'Households with Access to Water',unit:'% of households (improved source)',viz:'pct',value:'82.4%',src:'water_drinking_improved.csv · Lao Statistics Bureau · 2018–2024 · national'},
    {t:'Toilet Facility Categories',unit:'% of households (improved sanitation)',viz:'pct',value:'68%',src:'sanitation_toilet_access.csv · Lao Statistics Bureau · 2018–2024 · national'},
    {t:'Permanent Reserved Forests',unit:'hectares',viz:'kpi',value:'1.2 M ha',src:'land_forest_reserves.csv · Lao Statistics Bureau · 2021–2024 · adm1'}],3,
   'Households with Access to Water — Lao Statistics Bureau, 2018–2024; Toilet Facility Categories — Lao Statistics Bureau, 2018–2024; Permanent Reserved Forests — Lao Statistics Bureau, 2021–2024.')]};

C.Cambodia={flag:'\u{1F1F0}\u{1F1ED}',
 demo:{pop:'1,010,000',male:'498,000',female:'512,000',rows:AGE,vuln:{p:'High',e:'High',ec:'High',s:'High'},
  hh:{value:'245,000',gran:'adm1 (province)',src:'demographic_households.csv · NIS Cambodia · 2019'},
  hhNarr:'In <b>Siem Reap</b> Province, there are <b>245,000</b> households, as of 2019.'},
 sections:[
  section('employment',
   `The unemployment rate is <b>0.7%</b> and the employment rate is <b>82.6%</b> (labour-force participation). Most people work in <b>agriculture</b> and the largest employment sector is <b>agriculture</b>. This shows the local jobs mix and which livelihoods climate change could strain, or NbS could support.`,
   [{t:'Unemployment Rate',unit:'% of labour force',viz:'pct',value:'0.7%',src:'unemployment_rate.csv · NIS Cambodia · 2021 · national'},
    {t:'Employment Rate',unit:'% of working-age population 15+',viz:'pct',value:'82.6%',src:'employment_rate.csv · NIS Cambodia · 2021 · national'},
    {t:'Top 5 Industries / Occupations',unit:'% of employed persons',viz:'ranked',items:[{n:'Agriculture',v:'52.7%'},{n:'Tourism & Services',v:'24.9%'},{n:'Manufacturing',v:'12.3%'},{n:'Construction',v:'6.1%'},{n:'Transport & Storage',v:'4.0%'}],src:'employment_occupation.csv · NIS Cambodia · 2019 · national'},
    {t:'Employment by Sector',unit:'% of employed persons',viz:'stacked',segs:[{n:'Agriculture',v:53},{n:'Industry',v:20},{n:'Services',v:27}],src:'employment_by_sector.csv · NIS Cambodia · 1998–2019 · national'}],2,
   'Unemployment Rate — NIS Cambodia, 2021; Employment Rate — NIS Cambodia, 2021; Top 5 Industries / Occupations — NIS Cambodia, 2019; Employment by Sector — NIS Cambodia, 1998–2019.'),
  section('education',
   `In <b>Siem Reap</b> Province, <b>62,000</b> students are enrolled. This says the level of education this community has.`,
   [{t:'Number of Students Enrolled',unit:'students',viz:'kpi',value:'62,000',src:'education_student_enrolment.csv · NIS Cambodia · 2021 · adm1'}],1,
   'Number of Students Enrolled — NIS Cambodia, 2021.'),
  section('housing',
   `In <b>Siem Reap</b> Province, <b>79.1%</b> of households have access to safe water and <b>71%</b> have a hygienic toilet. These indicate the basic services and living conditions that shape how communities cope.`,
   [{t:'Households with Access to Water',unit:'% of households (safe water)',viz:'pct',value:'79.1%',src:'water_drinking_improved.csv · NIS Cambodia · 2021 · adm1'},
    {t:'Toilet Facility Categories',unit:'% of households (hygienic)',viz:'pct',value:'71%',src:'toilet_facilities.csv · NIS Cambodia · 2021 · adm1'}],2,
   'Households with Access to Water — NIS Cambodia, 2021; Toilet Facility Categories — NIS Cambodia, 2021.')]};

C.Myanmar={flag:'\u{1F1F2}\u{1F1F2}',
 demo:{pop:'1,180,000',male:'578,000',female:'602,000',rows:AGE,vuln:{p:'High',e:'High',ec:'Very High',s:'Very High'},
  hh:{value:'92,400',gran:'adm2+ (township)',src:'demographic_number_of_households.csv · MIMU / DoP · 2014–2020'},
  hhNarr:'In <b>Taunggyi</b> Township, there are <b>92,400</b> households, as of 2020.'},
 sections:[
  section('education',
   `In <b>Taunggyi</b> Township, <b>70,000</b> students are enrolled. This gives context on schooling and literacy, which shape how ready the community is for NbS work.`,
   [{t:'Number of Students Enrolled',unit:'students',viz:'kpi',value:'70,000',src:'education_student_enrolment.csv · MIMU / DoP · 2014–2020 · adm2+'}],1,
   'Number of Students Enrolled — MIMU / Dept. of Population, 2014–2020.')]};

C['Brunei Darussalam']={flag:'\u{1F1E7}\u{1F1F3}',
 demo:{pop:'460,000',male:'238,000',female:'222,000',rows:AGE,vuln:{p:'Low',e:'Low',ec:'Low',s:'Moderate'}},
 sections:[
  section('employment',
   `In <b>Brunei-Muara</b> District, the unemployment rate is <b>6.9%</b>, with an employment rate of <b>93.1%</b> and an underemployment rate of <b>3.4%</b>. Most people work as <b>service &amp; sales workers</b> and the biggest employment sector is <b>services</b>. This shows the local jobs mix and which livelihoods climate change could strain, or NbS could support.`,
   [{t:'Unemployment Rate',unit:'% of labour force',viz:'pct',value:'6.9%',src:'unemployment_rate.csv · DEPS Brunei · 2014–2022 · adm1'},
    {t:'Employment Rate',unit:'% of working-age population 15+',viz:'pct',value:'93.1%',src:'employment_to_population_ratio.csv · DEPS Brunei · 2014–2022 · adm1'},
    {t:'Underemployment Rate',unit:'% of labour force',viz:'kpi',value:'3.4%',src:'underemployment_rate.csv · DEPS Brunei · 2014–2022 · adm1'},
    {t:'Top 5 Industries / Occupations',unit:'% of employed persons',viz:'ranked',items:[{n:'Public Administration',v:'26.1%'},{n:'Oil & Gas',v:'18.7%'},{n:'Retail & Services',v:'15.2%'},{n:'Construction',v:'9.4%'},{n:'Education',v:'7.8%'}],src:'employment_by_sub_sector.csv · DEPS Brunei · 2014–2022 · adm1'},
    {t:'Employment by Sector',unit:'% of employed persons',viz:'stacked',segs:[{n:'Agriculture',v:2},{n:'Industry',v:39},{n:'Services',v:59}],src:'employment_by_sector.csv · DEPS Brunei · 2014–2022 · adm1'}],2,
   'Unemployment Rate — DEPS Brunei, 2014–2022; Employment Rate — DEPS Brunei, 2014–2022; Underemployment Rate — DEPS Brunei, 2014–2022; Top 5 Industries / Occupations — DEPS Brunei, 2014–2022; Employment by Sector — DEPS Brunei, 2014–2022.'),
  section('education',
   `Nationally, the literacy rate is <b>97.2%</b> and <b>42,000</b> students are enrolled. Together, these say how ready the community is to take part in NbS work.`,
   [{t:'Literacy Rate',unit:'% of community aged 15+',viz:'pct',value:'97.2%',src:'education_literacy_rate.csv · DEPS Brunei · 1971–2021 · national'},
    {t:'Number of Students Enrolled',unit:'students',viz:'kpi',value:'42,000',src:'education_student_enrolment.csv · DEPS Brunei · 2020–2024 · national'}],2,
   'Literacy Rate — DEPS Brunei, 1971–2021; Number of Students Enrolled — DEPS Brunei, 2020–2024.'),
  section('economy',
   `The average household income is <b>BND 4,650</b> per month. This sketches local earning conditions and who may be exposed to climate change.`,
   [{t:'Average Household Income',unit:'BND / month',viz:'kpi',value:'B$ 4,650',src:'income_by_household.csv · DEPS Brunei · 2005–2015 · national'}],1,
   'Average Household Income — DEPS Brunei, 2005–2015.'),
  section('housing',
   `In the selected area, <b>99.4%</b> of households have access to improved drinking water and <b>98%</b> of households have access to improved sanitation (national data). Permanent reserved forest covers <b>235,500 hectares</b> (national data), part of the area's natural buffer.`,
   [{t:'Households with Access to Water',unit:'% of households (improved source)',viz:'pct',value:'99.4%',src:'water_drinking_improved.csv · DEPS Brunei · 2016–2025 · national'},
    {t:'Toilet Facility Categories',unit:'% of households (improved sanitation)',viz:'pct',value:'98%',src:'sanitation_toilet_access.csv · DEPS Brunei · 2010–2023 · national'},
    {t:'Permanent Reserved Forests',unit:'% of reserved forest by class · 235,500 ha',viz:'stacked',segs:[{n:'Protection',v:44},{n:'Production',v:31},{n:'Conservation',v:19},{n:'Recreation',v:6}],src:'land_forest_reserves_edata.csv · DEPS Brunei · 2010–2025 · national'}],2,
   'Households with Access to Water — DEPS Brunei, 2016–2025; Toilet Facility Categories — DEPS Brunei, 2010–2023; Permanent Reserved Forests — DEPS Brunei, 2010–2025.')]};

C['Timor-Leste']={flag:'\u{1F1F9}\u{1F1F1}',
 demo:{pop:'320,000',male:'163,000',female:'157,000',rows:AGE,vuln:{p:'High',e:'High',ec:'Very High',s:'High'},
  hh:{value:'45,000',gran:'adm1 (municipality)',src:'demographic_number_of_households.csv · NSD Timor-Leste · 2015'},
  hhNarr:'In <b>Dili</b> Municipality, there are <b>45,000</b> households, as of 2015.'},
 sections:[
  section('employment',
   `In <b>Dili</b> Municipality, the employment rate is <b>95.1%</b>. This shows the local jobs mix and which livelihoods climate change could strain, or NbS could support.`,
   [{t:'Employment Rate',unit:'% of working-age population 15+',viz:'pct',value:'95.1%',src:'demographic_employment_rate.csv · NSD Timor-Leste · 2022 · adm1'}],1,
   'Employment Rate — NSD Timor-Leste, 2022.'),
  section('education',
   `In <b>Dili</b> Municipality, <b>26,000</b> students are enrolled. This says how ready the community is to take part in NbS work.`,
   [{t:'Number of Students Enrolled',unit:'students',viz:'kpi',value:'26,000',src:'education_student_enrolment.csv · NSD Timor-Leste · 2022–2023 · adm1'}],1,
   'Number of Students Enrolled — NSD Timor-Leste, 2022–2023.'),
  section('housing',
   `In <b>Dili</b> Municipality, <b>74.9%</b> of households have safe water. This covers the basic services and living conditions that shape how communities cope.`,
   [{t:'Households with Access to Water',unit:'% of households (safe water)',viz:'pct',value:'74.9%',src:'water_drinking_improved.csv · NSD Timor-Leste · 2021–2022 · adm1'}],1,
   'Households with Access to Water — NSD Timor-Leste, 2021–2022.')]};

/* ============ render ============ */
const ORDER=['Indonesia','Malaysia','Singapore','Thailand','Philippines','Vietnam','Laos','Cambodia','Myanmar','Brunei Darussalam','Timor-Leste'];
let tip=null;
function ensureTip(){if(!tip){tip=document.createElement('div');tip.className='pcx-tip';document.body.appendChild(tip);}return tip;}
function wireTips(app){const t=ensureTip();
 app.addEventListener('mousemove',e=>{
  const el=e.target.closest&&e.target.closest('[data-tip]');
  const txt=el&&(el.dataset?el.dataset.tip:el.getAttribute('data-tip'));
  if(txt){t.textContent=txt;t.classList.add('on');t.classList.toggle('wide',txt.length>90);
   const x=Math.min(e.clientX+14,innerWidth-t.offsetWidth-8);
   const y=Math.min(e.clientY+14,innerHeight-t.offsetHeight-8);
   t.style.left=x+'px';t.style.top=y+'px';}
  else t.classList.remove('on');});
 app.addEventListener('mouseleave',()=>t.classList.remove('on'));}
/* mount(container, opts) — opts.select/opts.flag reuse existing header controls
   (standalone page); without them a country pill row is rendered in-pane.
   opts.hash persists the chosen country in location.hash (standalone only). */
function mount(container,opts){opts=opts||{};
 container.classList.add('pcx');
 let sel=opts.select,flagEl=opts.flag,app=container;
 if(!sel){
  container.innerHTML='<div class="pcx-head"><span class="country-pill"><span class="pcx-flag"></span><select aria-label="Select country"></select></span></div><div class="pcx-app"></div>';
  sel=container.querySelector('select');flagEl=container.querySelector('.pcx-flag');app=container.querySelector('.pcx-app');}
 ORDER.forEach(n=>{const o=document.createElement('option');o.value=n;o.textContent=n;sel.appendChild(o);});
 function render(name){const d=C[name];
  if(flagEl)flagEl.textContent=d.flag;
  app.innerHTML=demoSection(d.demo)+d.sections.join('');
  if(opts.hash)location.hash=encodeURIComponent(name);}
 sel.addEventListener('change',()=>render(sel.value));
 const init=opts.hash?decodeURIComponent((location.hash||'').replace('#','')):'';
 sel.value=C[init]?init:'Indonesia';
 render(sel.value);
 wireTips(app);}
/* auto-mount the Data Analyser panes injected by analysis-shared.js */
document.querySelectorAll('[data-people-context]').forEach(el=>mount(el));
return {mount:mount,DATA:C,ORDER:ORDER};
})();
