return {
  "zaldih/themery.nvim",
  config = function ()
    require("themery").setup({
      themes = {
        "catppuccin-frappe",
        "catppuccin-macchiato",
        "catppuccin-mocha",
        "catppuccin-latte",
        "dracula",
        "dracula-soft",
        "kanagawa-wave",
        "kanagawa-dragon",
        "kanagawa-lotus",
        "nordic",
        "onehalf-lush",
        "onehalf-lush-dark",
      },
      livePreview = true,
    })
		vim.keymap.set("n", "<leader>T", ":Themery<CR>", {})

    -- Themery block
-- This block will be replaced by Themery.
vim.cmd("colorscheme catppuccin-mocha")
vim.g.theme_id = 3
-- end themery block
  end
}

