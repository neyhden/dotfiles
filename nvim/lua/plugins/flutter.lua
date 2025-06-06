return {
    'nvim-flutter/flutter-tools.nvim',
    lazy = false,
    dependencies = {
        'nvim-lua/plenary.nvim',
        'stevearc/dressing.nvim', -- optional for vim.ui.select
    },
    config = function ()
        require("flutter-tools").setup {
        ui = {
            border = "rounded",
        },
        decorations = {
            statusline = {
                app_version = false,
                device = false,
                project_config = false,
            }
        },
        debugger = { -- integrate with nvim dap + install dart code debugger
            enabled = false,
            exception_breakpoints = {},
            evaluate_to_string_in_debug_views = true,
        },
        flutter_lookup_cmd = nil, -- example "dirname $(which flutter)" or "asdf where flutter"
        root_patterns = { ".git", "pubspec.yaml" }, -- patterns to find the root of your flutter project
        fvm = false, -- takes priority over path, uses <workspace>/.fvm/flutter_sdk if enabled
        widget_guides = {
            enabled = true,
        },
      closing_tags = {
        prefix = "> ", -- character to use for close tag e.g. > Widget
        priority = 10, -- priority of virtual text in current line
        enabled = true -- set to false to disable
      },
      dev_log = {
        enabled = true,
        filter = nil, -- optional callback to filter the log
        notify_errors = false, -- if there is an error whilst running then notify the user
        open_cmd = "15split", -- command to use to open the log buffer
        focus_on_open = true, -- focus on the newly opened log window
      },
      dev_tools = {
        autostart = false, -- autostart devtools server if not detected
        auto_open_browser = false, -- Automatically opens devtools in the browser
      },
      outline = {
        open_cmd = "30vnew", -- command to use to open the outline buffer
        auto_open = false -- if true this will open the outline automatically when it is first populated
      },
      lsp = {
        color = { -- show the derived colours for dart variables
          enabled = false, -- whether or not to highlight color variables at all, only supported on flutter >= 2.10
          background = false, -- highlight the background
          background_color = nil, -- required, when background is transparent (i.e. background_color = { r = 19, g = 17, b = 24},)
          foreground = false, -- highlight the foreground
          virtual_text = true, -- show the highlight using virtual text
          virtual_text_str = "■", -- the virtual text character to highlight
        },
        --- OR you can specify a function to deactivate or change or control how the config is created
        -- see the link below for details on each option:
        -- https://github.com/dart-lang/sdk/blob/master/pkg/analysis_server/tool/lsp_spec/README.md#client-workspace-configuration
        settings = {
          showTodos = true,
          completeFunctionCalls = true,
          renameFilesWithClasses = "prompt", -- "always"
          enableSnippets = true,
          updateImportsOnRename = true, -- Whether to update imports and other directives when files are renamed. Required for `FlutterRename` command.
        }
      }
        }
        require("telescope").load_extension("flutter")
        vim.keymap.set("n", "<leader>ft", ":Telescope flutter commands<CR>", {})
    end,
}
