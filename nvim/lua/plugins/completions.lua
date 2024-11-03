return {
    {
        "hrsh7th/cmp-nvim-lsp",
    },
    {
        "L3MON4D3/LuaSnip",
        dependencies = {
            "saadparwaiz1/cmp_luasnip",
            "rafamadriz/friendly-snippets",
        }
    },
	{
		"hrsh7th/nvim-cmp",
		config = function()
			local cmp = require("cmp")
            require("luasnip.loaders.from_vscode").lazy_load()

			cmp.setup({
                -- Disable in comments
                enabled = function ()
                    local context = require("cmp.config.context")
                    if vim.api.nvim_get_mode().mode == 'c' then
                        return true
                    else
                        return not context.in_treesitter_capture("comment")
                            and not context.in_syntax_group("Comment")
                    end
                end,
                experimental = { ghost_text = true },
                snippet = {
                    expand = function(args)
                        require("luasnip").lsp_expand(args.body)
                    end,
                },
				window = {
					completion = cmp.config.window.bordered(),
					documentation = cmp.config.window.bordered(),
				},
                formatting = {
                    format = function (_, vim_item)
                        vim_item.abbr = string.sub(vim_item.abbr, 1, 30)
                        return vim_item
                    end
                },
				mapping = cmp.mapping.preset.insert({
                    ["<C-j>"] = cmp.mapping.scroll_docs(4),
                    ["<C-k>"] = cmp.mapping.scroll_docs(-4),
                    ["<Tab>"] = cmp.mapping.select_next_item(),
                    ["<S-Tab>"] = cmp.mapping.select_prev_item(),
					["<C-e>"] = cmp.mapping.abort(),
					["<CR>"] = cmp.mapping.confirm({ select = false }),
				}),
				sources = cmp.config.sources({
					{ name = "nvim_lsp" },
                    { name = "luasnip" }
				}, {
					{ name = "buffer" },
				}),
			})
		end,
	},
}
