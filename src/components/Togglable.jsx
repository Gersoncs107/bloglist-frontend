<Toggleble buttonLabel="Create New Blog">
    <LoginForm 
        handleSubmit={addBlog}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
        Title={title}
        Author={author}
        Url={url}
    />
</Toggleble>