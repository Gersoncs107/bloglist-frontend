import { useState } from "react";

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: formVisible ? 'none' : '' }
    const showWhenVisible = { display: formVisible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }
}

{/* <Togglable buttonLabel="Create New Blog">
    <LoginForm 
        handleSubmit={addBlog}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
        Title={title}
        Author={author}
        Url={url}
    />
</Togglable> */}