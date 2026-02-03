# How to Add a New Article

To add a new article/post to the portfolio, update **two files**:

## 1. `src/data/commands.tsx`

Add a new entry to the `articles` array in `CV_DATA`:

```tsx
articles: [
  {
    title: 'Your Article Title',
    description: 'Brief description of the article',
    url: 'https://grobino.substack.com/p/your-article-slug'
  },
  // ... existing articles
]
```

## 2. `src/App.tsx`

Add a new `<fieldset>` inside the Posts window (around line 173):

```tsx
<fieldset>
  <legend>Your Article Title</legend>
  <p>Brief description of the article.</p>
  <button onClick={() => window.open('https://grobino.substack.com/p/your-article-slug', '_blank')}>
    Read Post
  </button>
</fieldset>
```

## Notes

- Add new articles at the **top** of both lists to show newest first
- Keep descriptions concise (1-2 sentences)
- The `commands.tsx` data is used by the terminal `posts` command
- The `App.tsx` markup is used by the Posts window in the GUI
