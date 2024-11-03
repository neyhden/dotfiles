return {
  "nvim-neo-tree/neo-tree.nvim",
  branch = "v3.x",
  dependencies = {
    "nvim-lua/plenary.nvim",
    "nvim-tree/nvim-web-devicons",
    "MunifTanjim/nui.nvim",
  },
  config = function()
    vim.keymap.set("n", "<leader>e", function()
      require("neo-tree.command").execute({
        toggle = false,
        source = "filesystem",
        position = "left",
      })
    end)
    vim.keymap.set("n", "<leader>E", function()
      require("neo-tree.command").execute({
        toggle = true,
        source = "filesystem",
        position = "left",
      })
    end)
  end,
}
