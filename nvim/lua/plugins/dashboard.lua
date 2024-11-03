return {
    'nvimdev/dashboard-nvim',
    event = 'VimEnter',
    config = function ()
        require('dashboard').setup {
            theme = 'hyper',
            config = {
                week_header = {
                    enable = true,
                },
                project = {
                    enable = true,
                    limit = 8,
                    action = function (path)
                        vim.cmd('cd ' .. path)
                        vim.cmd('Telescope find_files cwd=' .. path)
                    end,
                },
                mru = { limit = 10 },
                shortcut = {
                    {
                        desc = '󰊳 Update',
                        group = '@property',
                        action = 'Lazy update',
                        key = 'u'
                    },
                    {
                        desc = ' Files',
                        group = 'Label',
                        action = 'Telescope find_files',
                        key = 'f',
                    },
                    {
                        desc = ' Config',
                        group = 'Number',
                        action = function ()
                            vim.cmd('cd ~/.config/nvim')
                            vim.cmd('Telescope find_files cwd=~/.config/nvim')
                        end,
                        key = 'c',
                    },
                    {
                        desc = '  Tree',
                        group = 'DiagnosticHint',
                        action = 'Neotree',
                        key = 'e',
                    },
                    {
                        desc = '󰩈 Exit',
                        group = 'Error',
                        action = 'qa',
                        key = 'q',
                    },
                },
            }
        }
    end
}
