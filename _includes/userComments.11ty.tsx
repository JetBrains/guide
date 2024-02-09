import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";

export type UserCommentsProps = {
	pageUrl: string;
	theme: "light" | "dark";
};

export const UserComments = ({
	pageUrl,
	theme = "light",
}: UserCommentsProps): JSX.Element => {
	const remark_config = `var remark_config = {
    host: "https://comments.blog.jetbrains.com",
    site_id: 'remark',
    components: ['embed'], 
    url: 'https://www.jetbrains.com/guide/${pageUrl.replace(/^\/+/, "")}',
    theme: '${theme}',
    locale: 'en'
  };`;

	const remark_script = `!function(e,n){for(var o=0;o<e.length;o++){var r=n.createElement("script"),c=".js",d=n.head||n.body;"noModule"in r?(r.type="module",c=".mjs"):r.async=!0,r.defer=!0,r.src=remark_config.host+"/web/"+e[o]+c,d.appendChild(r)}}(remark_config.components||["embed"],document);`;

	return (
		<Fragment>
			<hr />
			<div id="remark42"></div>
			<script>{remark_config}</script>
			<script>{remark_script}</script>
		</Fragment>
	);
};
