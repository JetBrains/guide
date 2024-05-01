---
type: TutorialStep
date: 2024-04-22
title: UI Design
topics:
  - go
  - web
author: rpeden
subtitle: ""
thumbnail: ./thumbnail.png
---

### Developing the UI

With your React application ready, you can start creating React components. You'll use Tailwind CSS for styling, so add it to your project by including the CDN link in the `<head>` section of your `public/index.html` file:

```html
<link
	href="https://cdn.jsdelivr.net/npm/tailwindcss@latest/dist/tailwind.min.css"
	rel="stylesheet"
/>
```

Now, it's time to create the chat UI. The UI consists of the following components, each of which communicates with the Gin backend in different ways:

- `Login.js` allows a user to log in by sending a POST request with their username and password to the `/login` endpoint.
- `CreateUser.js` lets a new user sign up by sending a POST request with their username and password to the `/users` endpoint.
- `MainChat.js` displays the chat interface. It doesn't directly communicate with the backend but orchestrates the communication of its child components.
- `ChannelsList.js` retrieves and displays a list of chat channels by sending a GET request to the `/channels` endpoint and allows users to create new channels by POSTing the channel name to the same endpoint.
- `MessagesPanel.js` fetches and displays messages for the selected channel by sending a GET request to the `/messages` endpoint.
- `MessageEntry.js` enables users to send messages to the current channel by sending a POST request to the `/messages` endpoint.

Next, you'll see the code for each component, along with a description of what the component does.

For a preview of where the project ends up at the end of this tutorial, see the [final GitHub repository](https://github.com/rpeden/go-gin-react-part2) for this part of the series.

If you're not fully familiar React or Tailwind, here are a few key docs and tutorials you may find helpful:

**React**

- [The Beginner's Guide to React](https://egghead.io/courses/the-beginner-s-guide-to-react)
- [Managing State in React](https://react.dev/learn/managing-state)
- [React Form Components](https://react.dev/reference/react-dom/components#form-components)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)

**Tailwind**

- [Tailwind CSS docs](https://tailwindcss.com/docs)
- [Beginner's Guide to Tailwind](https://www.freecodecamp.org/news/what-is-tailwind-css-a-beginners-guide/)

#### Login.js

Create each component file in the `src` subdirectory of the `chat-ui` directory. You can do this in GoLand by right-clicking `src` and selecting _New | JavaScript File_:

![New | JavaScript File selection](https://i.imgur.com/rEi1m93.png)

Start by adding the Login component:

```jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch("/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		});

		if (response.ok) {
			const data = await response.json();
			localStorage.setItem("userId", data.id);
			localStorage.setItem("userName", username);
			navigate("/chat");
		} else {
			alert("Login failed");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<form onSubmit={handleSubmit} className="p-8 border rounded shadow-md">
				<div className="mb-4">
					<label
						htmlFor="username"
						className="block text-sm font-medium text-gray-700"
					>
						Username
					</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="mt-1 p-2 w-full border rounded-md"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="mt-1 p-2 w-full border rounded-md"
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full p-2 bg-blue-500 text-white rounded-md"
				>
					Log In
				</button>
				<div className="mt-4 text-center">
					<span className="text-sm text-gray-600">Don't have an account? </span>
					<a href="/create-user" className="text-blue-500 hover:underline">
						Create one
					</a>
				</div>
			</form>
		</div>
	);
};

export default Login;
```

When `Login` renders, it initializes two pieces of state, `username` and `password`, and accesses browsing history via the `useHistory` hook.

It then renders a form with fields for the username and password. It sets their values to be controlled components by binding them to the `username` and `password` states.

On form submission, the `handleSubmit` function makes a POST request to the `/login` endpoint, with the username and password as the payload, and redirects to the chat page upon successful login.

#### CreateUser.js

Next, add the `CreateUser` component the same way you added `Login`:

```jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch("/users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		});

		if (response.ok) {
			navigate("/");
		} else {
			alert("Account creation failed");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<form onSubmit={handleSubmit} className="p-8 border rounded shadow-md">
				<div className="mb-4">
					<label
						htmlFor="username"
						className="block text-sm font-medium text-gray-700"
					>
						Username
					</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="mt-1 p-2 w-full border rounded-md"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="mt-1 p-2 w-full border rounded-md"
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full p-2 bg-blue-500 text-white rounded-md"
				>
					Create Account
				</button>
			</form>
		</div>
	);
};

export default CreateUser;
```

`CreateUser` renders a form with fields for the username and password, binding them to the respective states.

On form submission, the component sends a POST request to `/users` with the username and password. The user is redirected to the login page if account creation succeeds.

#### MainChat.js

Add the `MainChat` component that renders the chat UI:

```jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChannelsList from "./ChannelsList";
import MessagesPanel from "./MessagesPanel";

const MainChat = () => {
	const { channelId } = useParams();
	const navigate = useNavigate();
	const [selectedChannel, setSelectedChannel] = useState(
		parseInt(channelId) || null
	);

	// If the component loads with a channel ID in the URL, set it as the selected channel.
	useEffect(() => {
		if (selectedChannel) {
			navigate(`/chat/${selectedChannel.id}`);
		}
	}, [selectedChannel, navigate]);

	const handleChannelSelect = (channelId) => {
		setSelectedChannel(channelId);
	};

	return (
		<div className="flex h-screen">
			<div className="w-1/4 border-r">
				<ChannelsList
					selectedChannel={selectedChannel}
					setSelectedChannel={handleChannelSelect}
				/>
			</div>
			<div className="w-3/4">
				<MessagesPanel selectedChannel={selectedChannel} />
			</div>
		</div>
	);
};

export default MainChat;
```

`MainChat` initializes its `selectedChannel` state as `null` and retrieves the channel ID from the URL if present.

It renders two child components:

- `ChannelsList` displays a list of channels and allows the user to select one.
- `MessagesPanel` displays the messages of the selected channel.

When the user selects a channel in the list, it updates the `selectedChannel` state in `MainChat` and updates the URL to include the selected channel ID. This selected channel ID is also passed as a prop to `MessagesPanel` to display messages for that channel.

#### ChannelsList.js

The following code adds the `ChannelsList` component that lets users select which chat channel to join:

```jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ChannelsList = ({ selectedChannel, setSelectedChannel }) => {
	const { channelId } = useParams();
	const [channels, setChannels] = useState([]);
	const [newChannelName, setNewChannelName] = useState("");

	useEffect(() => {
		if (channelId) {
			const channel = channels.find(
				(channel) => channel.id === parseInt(channelId)
			);
			if (channel) {
				setSelectedChannel({ name: channel.name, id: parseInt(channelId) });
			}
		}
	}, [channelId, channels]);

	useEffect(() => {
		const fetchChannels = async () => {
			const response = await fetch("/channels");
			const data = await response.json();
			setChannels(data || []);
		};
		fetchChannels();
	}, []);

	const handleAddChannel = async () => {
		const response = await fetch("/channels", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: newChannelName }),
		});

		if (response.ok) {
			const newChannel = await response.json();
			setChannels([...channels, { id: newChannel.id, name: newChannelName }]);
			setNewChannelName("");
		}
	};

	return (
		<div className="flex flex-col h-full bg-gray-100 border-r">
			<div className="bg-gray-700 text-white p-2">Channels</div>
			<div className="overflow-y-auto flex-grow p-4">
				{channels ? (
					<ul className="w-full">
						{channels.map((channel) => (
							<li
								key={channel.id}
								className={`p-2 rounded-md w-full cursor-pointer ${
									parseInt(channelId) === channel.id
										? "bg-blue-500 text-white"
										: "hover:bg-gray-200"
								}`}
								onClick={() => setSelectedChannel(channel)}
							>
								{channel.name}
							</li>
						))}
					</ul>
				) : (
					<div className="text-center text-gray-600">Please add a Channel</div>
				)}
			</div>
			<div className="flex flex-col p-4">
				<input
					type="text"
					value={newChannelName}
					onChange={(e) => setNewChannelName(e.target.value)}
					placeholder="New channel..."
					className="mb-4 p-2 w-full border rounded-md bg-white"
				/>
				<button
					onClick={handleAddChannel}
					className="p-2 bg-blue-500 text-white rounded-md"
				>
					Add Channel
				</button>
			</div>
		</div>
	);
};

export default ChannelsList;
```

When `ChannelsList` renders, it initializes the state for the list of channels and the name of a new channel.

It fetches the list of channels from the `/channels` endpoint and displays them. Users can click a channel to select it, which updates `selectedChannel` in the parent component.

Users can type a new channel name and click a button labeled "Add Channel" to send a POST request to `/channels`, which creates a new channel and adds it to the list.

#### MessagesPanel.js

You'll now add the `MessagesPanel` component, which lets users see the most recent messages in the chat channel they have selected:

```jsx
import React, { useState, useEffect, useRef } from "react";
import MessageEntry from "./MessageEntry";

const MessagesPanel = ({ selectedChannel }) => {
	const [messages, setMessages] = useState([]);
	const lastMessageIdRef = useRef(null); // Keep track of the last message ID

	useEffect(() => {
		if (!selectedChannel) return;

		let isMounted = true; // flag to prevent state updates after unmount
		let intervalId = null;

		const fetchMessages = async () => {
			const response = await fetch(`/messages?channelID=${selectedChannel.id}`);
			const data = await response.json();
			if (isMounted) {
				let messageData = data || [];
				setMessages(messageData);
				lastMessageIdRef.current =
					messageData.length > 0
						? messageData[messageData.length - 1].id
						: null;
			}
		};

		fetchMessages();

		intervalId = setInterval(() => {
			if (lastMessageIdRef.current !== null) {
				fetch(
					`/messages?channelID=${selectedChannel.id}&lastMessageID=${lastMessageIdRef.current}`
				)
					.then((response) => response.json())
					.then((newMessages) => {
						if (
							isMounted &&
							Array.isArray(newMessages) &&
							newMessages.length > 0
						) {
							setMessages((messages) => {
								const updatedMessages = [...messages, ...newMessages];
								lastMessageIdRef.current =
									updatedMessages[updatedMessages.length - 1].id;
								return updatedMessages;
							});
						}
					});
			}
		}, 5000); // Poll every 5 seconds

		return () => {
			isMounted = false; // prevent further state updates
			clearInterval(intervalId); // clear interval on unmount
		};
	}, [selectedChannel]);

	return (
		<div className="flex flex-col h-full">
			{selectedChannel && (
				<div className="bg-gray-700 text-white p-2">
					Messages for {selectedChannel.name}
				</div>
			)}
			<div
				className={`overflow-auto flex-grow ${
					selectedChannel && messages.length === 0
						? "flex items-center justify-center"
						: ""
				}`}
			>
				{selectedChannel ? (
					messages.length > 0 ? (
						messages.map((message) => (
							<div key={message.id} className="p-2 border-b">
								<strong>{message.user_name}</strong>: {message.text}
							</div>
						))
					) : (
						<div className="text-center text-gray-600">
							No messages yet! Why not send one?
						</div>
					)
				) : (
					<div className="p-2">Please select a channel</div>
				)}
			</div>
			{selectedChannel && (
				<MessageEntry
					selectedChannel={selectedChannel}
					onNewMessage={(message) => {
						lastMessageIdRef.current = message.id;
						setMessages([...messages, message]);
					}}
				/>
			)}
		</div>
	);
};

export default MessagesPanel;
```

When `MessagesPanel` renders, it initializes an empty array for messages. The component prompts the user to select a channel if no channel is selected.

If a channel is selected, the component fetches the channel's messages with a GET request to the `/messages` endpoint. It then maps through the fetched messages and displays each message with the username and text.

The component uses `setInterval` to check for new messages in the channel every five seconds.

Finally, it renders the `MessageEntry` component so users can write new messages to the channel.

#### MessageEntry.js

Finally, the `MessageEntry` component lets users enter new chat messages in the channel:

```jsx
import React, { useState } from "react";

const MessageEntry = ({ selectedChannel, onNewMessage }) => {
	const [text, setText] = useState("");

	const handleSendMessage = async () => {
		const userID = localStorage.getItem("userId");
		const userName = localStorage.getItem("userName");

		const response = await fetch("/messages", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				channel_id: parseInt(selectedChannel.id),
				user_id: parseInt(userID),
				text,
			}),
		});

		if (response.ok) {
			const message = await response.json();
			onNewMessage({
				id: message.id,
				channel_id: selectedChannel,
				user_id: userID,
				user_name: userName,
				text,
			});
			setText("");
		} else {
			alert("Failed to send message");
		}
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter" && !event.shiftKey) {
			handleSendMessage();
			event.preventDefault(); // Prevent the default behavior (newline)
		}
	};

	return (
		<div className="p-4 border-t flex">
			<input
				type="text"
				placeholder="Type a message..."
				value={text}
				onChange={(e) => setText(e.target.value)}
				onKeyDown={handleKeyDown}
				className="p-2 flex-grow border rounded-md mr-2"
			/>
			<button
				onClick={handleSendMessage}
				className="p-2 bg-blue-500 text-white rounded-md"
			>
				Send
			</button>
		</div>
	);
};

export default MessageEntry;
```

`MessageEntry` renders an input field so the user can enter a new message, as well as a "Send" button. The input value is bound to the text state.

On clicking the "Send" button, the `handleSendMessage` function is triggered. This function retrieves the user ID from local storage, then makes a POST request to the `/messages` endpoint with the selected channel ID, user ID, and text content as the payload.

If the message is sent successfully, the `onNewMessage` callback is invoked with the new message so the parent `MessagesPanel` component can render it, and the input field clears. An alert displays if the message fails to send.

### Updating App.js

You need to update `src/App.js` to import the `Login`, `CreateUser`, and `MainChat` components and add them as routes:

```jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import CreateUser from "./CreateUser";
import MainChat from "./MainChat";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/create-user" element={<CreateUser />} />
				<Route path="/chat" element={<MainChat />} />
				<Route path="/chat/:channelId" element={<MainChat />} />
				<Route path="/" element={<Login />} />
			</Routes>
		</Router>
	);
};

export default App;
```

With these changes, the `App` component creates a router so the browser URL will match the page the user is on.

### Updating index.js

Finally, update `src/index.js` to remove some `create-react-app` boilerplate:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
```

And with that, all the React components for your chat app are complete.
