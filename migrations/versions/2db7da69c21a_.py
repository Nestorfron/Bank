"""empty message

Revision ID: 2db7da69c21a
Revises: 
Create Date: 2024-10-12 20:30:27.635736

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2db7da69c21a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_name', sa.String(length=30), nullable=False),
    sa.Column('password', sa.String(length=180), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('names', sa.String(length=50), nullable=False),
    sa.Column('last_names', sa.String(length=50), nullable=False),
    sa.Column('employee_number', sa.String(length=20), nullable=False),
    sa.Column('subzone', sa.String(length=50), nullable=False),
    sa.Column('role', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('employee_number'),
    sa.UniqueConstraint('user_name')
    )
    op.create_table('branch',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('branch_cr', sa.String(length=50), nullable=False),
    sa.Column('branch_address', sa.String(length=50), nullable=False),
    sa.Column('branch_zone', sa.String(length=50), nullable=False),
    sa.Column('branch_subzone', sa.String(length=50), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('branch_cr')
    )
    op.create_table('provider',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('company_name', sa.String(length=50), nullable=False),
    sa.Column('rfc', sa.String(length=30), nullable=False),
    sa.Column('service', sa.String(length=50), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('branch_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['branch_id'], ['branch.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('rfc')
    )
    op.create_table('migration',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('installation_date', sa.Date(), nullable=False),
    sa.Column('migration_date', sa.Date(), nullable=False),
    sa.Column('migration_description', sa.String(length=250), nullable=False),
    sa.Column('migration_status', sa.String(length=50), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('provider_id', sa.Integer(), nullable=False),
    sa.Column('branch_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['branch_id'], ['branch.id'], ),
    sa.ForeignKeyConstraint(['provider_id'], ['provider.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('assets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('asset_type', sa.String(length=50), nullable=False),
    sa.Column('asset_brand', sa.String(length=50), nullable=False),
    sa.Column('asset_model', sa.String(length=50), nullable=False),
    sa.Column('asset_serial', sa.String(length=50), nullable=False),
    sa.Column('asset_inventory_number', sa.String(length=50), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('branch_id', sa.Integer(), nullable=True),
    sa.Column('migration_id', sa.Integer(), nullable=True),
    sa.Column('provider_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['branch_id'], ['branch.id'], ),
    sa.ForeignKeyConstraint(['migration_id'], ['migration.id'], ),
    sa.ForeignKeyConstraint(['provider_id'], ['provider.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_mb',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_name_MB', sa.String(length=30), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('names', sa.String(length=50), nullable=False),
    sa.Column('last_names', sa.String(length=50), nullable=False),
    sa.Column('employee_number', sa.String(length=20), nullable=False),
    sa.Column('asset_id', sa.Integer(), nullable=False),
    sa.Column('branch_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['asset_id'], ['assets.id'], ),
    sa.ForeignKeyConstraint(['branch_id'], ['branch.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('employee_number'),
    sa.UniqueConstraint('user_name_MB')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_mb')
    op.drop_table('assets')
    op.drop_table('migration')
    op.drop_table('provider')
    op.drop_table('branch')
    op.drop_table('user')
    # ### end Alembic commands ###
