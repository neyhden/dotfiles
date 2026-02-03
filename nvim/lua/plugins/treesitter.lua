return {
	"nvim-treesitter/nvim-treesitter",
	build = ":TSUpdate",
  branch = "main",
	config = function()
		local config = require("nvim-treesitter.config")
		config.setup({
			auto_install = true,
			highlight = { enable = true },
			indent = { enable = true },
		})
	end,
}
